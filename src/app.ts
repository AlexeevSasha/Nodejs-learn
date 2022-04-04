import express, {Express} from 'express'
import {Server} from 'http'
import {UsersController} from "./users/users.controller";
import {ExeptionFilter} from "./errors/exeption.filter";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {ILogger} from "./logger/logger.interface";
import 'reflect-metadata';


@injectable()
export class App {
    port: number;
    app: Express;
    server: Server;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UsersController,
        @inject(TYPES.ExeptionFilter) private exeptiomFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    useExeptionFilters() {
        this.app.use(this.exeptiomFilter.catch.bind(this.exeptiomFilter))
    }

    public async init() {
        this.useRoutes()
        this.useExeptionFilters();
        this.server = this.app.listen(this.port)
        this.logger.log('SERVER START')
    }
}