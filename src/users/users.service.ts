import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { TYPES } from "../types";
import { IConfigService } from "../config/config.service.interface";
import { IUsersRepository } from "./users.repository.interface";
import { UserModel } from "@prisma/client";

@injectable()
export class UsersService implements IUsersService {

	constructor(@inject(TYPES.ConfigService) private configService: IConfigService,
							@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, name)
		const solt = this.configService.get('SALT')
    await newUser.setPassword(password, +solt)

		 const extistedUser = await this.usersRepository.find(email);
		 if (extistedUser) return null;
		 return this.usersRepository.create(newUser);
	}

	async validateUser({email, password}: UserLoginDto): Promise<boolean> {
		const extistedUser = await this.usersRepository.find(email);
		if (!extistedUser) return false;
		const user = new User(extistedUser.email, extistedUser.name, extistedUser.password)
		return user.comparePassword(password)
	}

	async getuserInfo(email: string):Promise<UserModel | null> {
      return this.usersRepository.find(email)
	}
}
