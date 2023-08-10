import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateNotificationDto {

    @IsNotEmpty()
    @MaxLength(64)
    title: string;

    @IsNotEmpty()
    @MaxLength(512)
    content: string;
    
}
