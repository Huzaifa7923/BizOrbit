import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
// import { GlobalExceptionFilter } from './common/filters/exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
  app.use(cookieParser());
  //jisse validation fail hone pr  error throw / validation decorators will get triggered
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // transform payloads to DTO instances
    whitelist: true, // remove unwanted fields
  }));


  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();


// interceptor
// validationFilter
