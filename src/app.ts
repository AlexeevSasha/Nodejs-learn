import express, {Express} from 'express'
import {Server} from 'http'
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExeptionFilter} from "./errors/exeption.filter";

export class App {
    port: number;
    app: Express;
    server: Server;
    logger: LoggerService;
    userController: UsersController;
    exeptiomFilter: ExeptionFilter

    constructor(
        logger: LoggerService,
        userController: UsersController,
        exeptiomFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptiomFilter = exeptiomFilter;
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