import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PagePipe implements PipeTransform{
    constructor(){}

    transform(value: any, metadata: ArgumentMetadata) {
        if(value === undefined) return 1;
        value = +value;
        if(isNaN(value)) throw new BadRequestException();
        if(value < 1 || value > 1000000000) throw new BadRequestException();
        return value;
    }
}