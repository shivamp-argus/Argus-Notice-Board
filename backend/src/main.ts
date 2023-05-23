import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import helmet from 'helmet'

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "http://localhost:4200" })
  app.use(helmet())
  await app.listen(3000);
}
bootstrap();
