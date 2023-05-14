import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  getHello(): string {
    const config = new ConfigService();
    console.log(config.get('DBURL'));
    return 'Hello World!';
  }
}
