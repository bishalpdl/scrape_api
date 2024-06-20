import { Injectable } from '@nestjs/common';
import { PublicCreateProductDto } from './dto/public-create.dto';
import { ProductRepository } from './product.repository';
import { VariantService } from './variant/variant.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly variantService: VariantService,
  ) {}

  private async retrieveOrCreate(productSlug: string) {
    let product = await this.productRepository.findOne({
      where: {
        productSlug,
      },
    });

    if (!product) {
      product = await this.productRepository.save(
        this.productRepository.create({
          productSlug,
        }),
      );
    }
    return product;
  }

  async create(createDto: PublicCreateProductDto) {
    const { productSlug, ...variantData } = createDto;
    await this.retrieveOrCreate(productSlug);

    await this.variantService.createVariant(variantData);
  }
}
