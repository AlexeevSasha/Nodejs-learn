import { inject, injectable } from "inversify";
import { PrismaClient, UserModel } from '@prisma/client';
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import 'reflect-metadata';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(	@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log("[PrismaService] Успешное подключение к базе данных")
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error("[PrismaService] Ошибка при подключении к базе данных: ", e.message)
      }
    }
	}
	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
