import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfigs = new DocumentBuilder()
  .setTitle('Scrapping')
  .setDescription('API Documentation')
  .setVersion('2.0')
  .addTag('API List:')
  .addSecurity('Bearer', {
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
  })
  .addSecurityRequirements('Bearer')
  .build();

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Scraping api docs.',
};
