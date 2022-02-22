import { Module } from '@nestjs/common'; //orgenize ctrl and prvd scope
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/products.module'; //product module
import { ConfigModule } from '@nestjs/config'; //inject dotenv file
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
