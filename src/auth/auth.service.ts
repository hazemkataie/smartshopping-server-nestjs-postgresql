//auth.service.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/user/entities/user.entity';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//     constructor(
//         private readonly userService: UserService,
//         private readonly jwtService: JwtService,
//     ) { }

//     async validateUser(email: string, password: string): Promise<any> {
//         const user = await this.userService.findOneByEmail(email);
//         if (user && this.comparePasswords(password, user.password)) {
//             const { password, ...result } = user;
//             return result;
//         }
//         return null;
//     }

//     // Login user
//     async login(user: User, rememberMe: boolean = false) {
//         // generate and sign token
//         const payload = { email: user.email, sub: user.id };
//         const expiresIn = rememberMe ? '7d' : '1d';
//         return {
//             access_token: this.jwtService.sign(payload, { expiresIn }),
//         };
//     }

//     // Compare passwords
//     private comparePasswords(
//         inputPassword: string,
//         hashedPassword: string,
//     ): boolean {
//         return bcrypt.compareSync(inputPassword, hashedPassword);
//     }

//     // Hash password
//     async hashPassword(password: string): Promise<string> {
//         return await bcrypt.hash(password, 10);
//     }

//     // Verify token
//     async verifyToken(token: string): Promise<any> {
//         try {
//             const decodedToken = await this.jwtService.verifyAsync(token);
//             return decodedToken;
//         } catch (error) {
//             throw new UnauthorizedException();
//         }
//     }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, password: string): Promise<{ token: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
