import {Component, Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {Session} from "./SessionEntity";

@Component()
export class SessionService {

    constructor(@Inject('SessionRepositoryToken')
                private readonly sessionRepository: Repository<Session>) {
    }


    async findById(id: number): Promise<Session | undefined> {
        return await this.sessionRepository.findOne(id);
    }
}
