import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.APP_PORT;
  (async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('Api documentation for todo.')
      .setVersion('1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: true,
        tagsSorter: 'alpha',
      },
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () =>
      Logger.log(`Api docs on http://localhost:${PORT}/api`, 'Bootstrap'),
    );
    Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
  })();
}
bootstrap();
