import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfigs = new DocumentBuilder()
  .setTitle('Enimran v2 API')
  .setDescription('Enirman v2 API Documentation')
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
  customSiteTitle: 'Enirman v2 API Documentation',
};
