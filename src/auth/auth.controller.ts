//auth.controller.ts
// import {
//     Controller,
//     Post,
//     UseGuards,
//     Request,
//     Body,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('auth')
// export class AuthController {
//     constructor(private readonly authService: AuthService) { }

//     @Post('login')
//     @UseGuards(AuthGuard('local'))
//     async login(@Request() req) {
//         return this.authService.login(req.user, req.body.rememberMe);
//     }

//     @Post('validate')
//     @UseGuards(AuthGuard('jwt'))
//     async verifyToken(@Body('token') token: string) {
//         try {
//             const decodedToken = await this.authService.verifyToken(token);
//             return decodedToken;
//         } catch (error) {
//             throw new UnauthorizedException();
//         }
//     }
// }


import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }
}
