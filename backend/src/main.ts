import { NestFactory } from '@nestjs/core';
import { AppModule } from './root/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  	const app = await NestFactory.create(AppModule);
  	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			disableErrorMessages: true
  		})
	);
  	app.setGlobalPrefix('api');
  	await app.listen(3000);
	
}
bootstrap();
