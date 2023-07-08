import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PageSizePipe implements PipeTransform{
    constructor(){}

    transform(value: any, metadata: ArgumentMetadata) {
        if(value === undefined) return 10;
        value = parseInt(value, 10);
        if(isNaN(value)) throw new BadRequestException();
        if(value < 1 || value > 40) throw new BadRequestException();
        return value;
    }
}