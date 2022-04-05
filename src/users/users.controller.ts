import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UsersService } from "./users.service";
import { HttpError } from "../errors/http-error";
import { ValidateMiddleware } from "../common/validate.middleware";

@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger,
							@inject(TYPES.UsersService) private userService : UsersService) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)] },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto >, res: Response, next: NextFunction): void {
		 console.log(req.body);
		this.ok(res, 'login');
	}

	async register({body}: Request<{}, {}, UserRegisterDto >, res: Response, next: NextFunction): Promise<void> {
     const result = await this.userService.createUser(body)
		if (!result) {
			return next(new HttpError(422, 'Такой пользователь существует!'))
		}
		this.ok(res, {email: result.email});
	}
}
