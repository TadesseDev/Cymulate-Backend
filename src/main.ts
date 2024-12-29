import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cymulate Security ')
    .setDescription(
      'Cymulate’s Phishing Awareness vector is designed to evaluate your employees’ security awareness. It simulates phishing campaigns and detects weak links in your organization. Since it is designed to reduce the risk of spear-phishing, ransomware or CEO fraud, the solution can help you to avoid data breaches, minimize malware-related downtime and save money on incident response.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
