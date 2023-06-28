import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalAthleteStrategy extends PassportStrategy(Strategy, 'athlete'){
    constructor(private authService: AuthService){
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string){
        const user = await this.authService.validateAthlete(email, password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}