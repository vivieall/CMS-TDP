import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/allExceptionsFilter';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const name = 'SignHub'
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(name)
    .setDescription(`The ${name} API description`)
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document, {
    customCssUrl: 'https://raw.githubusercontent.com/ostranme/swagger-ui-themes/develop/themes/3.x/theme-monokai.css'
  });
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
}
bootstrap();
