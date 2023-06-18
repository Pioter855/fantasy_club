import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        return config.get<TypeOrmModuleOptions>('database');
      },
    }),
    ItemModule,
    AuthModule,
    UserModule,
    AuthorModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
