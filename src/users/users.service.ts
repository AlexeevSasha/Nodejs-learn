import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name)
    await newUser.setPassword(password)
		return newUser;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return false;
	}
}
