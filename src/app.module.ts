import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局注册，其他模块可以直接注入 ConfigService
    }),

    // 配置 MongoDB 连接，从 ConfigService 获取环境变量
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // 一个工厂函数，创建 MongoDB 连接配置
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/ai-server',
      }),
      inject: [ConfigService],
    }),

    // 导入 UserModule 来处理用户相关路由和服务
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
