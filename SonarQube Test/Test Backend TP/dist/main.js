"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const allExceptionsFilter_1 = require("./utils/allExceptionsFilter");
const port = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const name = 'SignHub';
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle(name)
        .setDescription(`The ${name} API description`)
        .setVersion('1.0')
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/swagger', app, document, {
        customCssUrl: 'https://raw.githubusercontent.com/ostranme/swagger-ui-themes/develop/themes/3.x/theme-monokai.css'
    });
    app.enableCors();
    app.useGlobalFilters(new allExceptionsFilter_1.AllExceptionsFilter());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map