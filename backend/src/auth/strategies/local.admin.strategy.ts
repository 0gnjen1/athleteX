import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy, 'admin'){

    constructor(
        private readonly authService: AuthService
    ){
        super({
            usernameField: 'email'
        });
    }

    async validate(
        email: string,
        password: string
    ){
        const admin = await this.authService.validateAdmin(email, password);
        if(!admin){
            throw new UnauthorizedException();
        }
        return admin;
    }

}