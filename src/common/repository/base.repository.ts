import {
  ClassTransformOptions,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsOrder,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import {
  PaginationOptions,
  PaginationQuery,
  PaginationResult,
} from '../@types/interfaces/pagination.interface';
import { CustomBaseEntity } from '../entity/base.entity';
import { CustomBaseSerializer } from '../serializers/base.serializer';

export class CustomBaseRepository<
  T extends CustomBaseEntity,
  K extends CustomBaseSerializer,
> extends Repository<T> {
  private cls: new (...args: any[]) => K;

  constructor(
    target: EntityTarget<T>,
    protected dataSource: DataSource,
    cls: new (...args: any[]) => K,
  ) {
    super(target, dataSource.manager);
    this.cls = cls;
  }

  private parsePaginationOptions(options: PaginationOptions<T>) {
    const {
      page = 1,
      limit = 20,
      order = { createdAt: 'DESC' } as FindOptionsOrder<T>,
      ...rest
    } = options;
    const skip = (page - 1) * limit;

    return { ...rest, skip, take: limit, order };
  }

  async retrieve(
    opts: FindOneOptions<T>,
    transformOptions: ClassTransformOptions = {},
  ) {
    const data = await this.findOne(opts);
    return this.transformOne(data, transformOptions);
  }

  async getAll(
    opts: FindOneOptions<T>,
    transformOptions?: ClassTransformOptions,
  ) {
    const data = await this.find(opts);
    return this.transformMany(data, transformOptions);
  }

  async pagination(
    options: PaginationOptions<T>,
    transformOptions: ClassTransformOptions = {},
  ): Promise<PaginationResult<K>> {
    const [items, count] = await this.findAndCount(
      this.parsePaginationOptions(options),
    );

    return {
      items: this.transformMany(items, transformOptions),
      totalItems: count,
      totalPages: Math.ceil(count / options.limit),
      currPage: options.page,
      limit: options.limit,
      hasNextPage: count > options.page * options.limit,
    };
  }

  async paginationQb(
    qb: SelectQueryBuilder<T>,
    paginationOptions?: PaginationQuery,
  ) {
    const { page = 1, limit = 20 } = paginationOptions ?? {};
    const offset = Math.max(page - 1, 0) * limit;

    const items = await qb
      .limit(limit + 1)
      .offset(offset)
      .getRawMany();

    const hasNextPage = items.length > limit;
    hasNextPage && items.pop();

    return {
      items,
      currPage: page,
      limit,
      hasNextPage,
    };
  }

  async transaction(
    transactionalFunction: (entityManager: EntityManager) => Promise<any>,
  ) {
    const qr: QueryRunner = this.dataSource.createQueryRunner();
    await qr.startTransaction();
    try {
      const returnData = await transactionalFunction(qr.manager);
      await qr.commitTransaction();
      return returnData;
    } catch (err) {
      await qr.rollbackTransaction();
      throw err;
    }
  }

  transformOne(data: T, options?: ClassTransformOptions) {
    return plainToInstance(this.cls, instanceToPlain(data), options);
  }

  transformMany(data: T[], options?: ClassTransformOptions) {
    return data.map((d) => this.transformOne(d, options));
  }
}
