import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExeptionFilter} from "./errors/exeption.filter";

const bootstrap = async () => {
    const logger = new LoggerService();
    const app = new App(logger, new UsersController(logger), new ExeptionFilter(logger));
    await app.init()
}

bootstrap();
