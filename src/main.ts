import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  // 全局使用 ValidationPipe 来验证 DTO
  app.useGlobalPipes(new ValidationPipe());
}

// 加载 .env 文件
dotenv.config();

bootstrap();
