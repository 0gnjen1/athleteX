import { Module } from '@nestjs/common';
import { InjuriesController } from './injuries.controller';
import { InjuriesService } from './injuries.service';

@Module({
    controllers: [
        InjuriesController
    ],
    providers: [
        InjuriesService
    ]
})
export class InjuriesModule {}
