import { Component } from "@nestjs/common";
import { User } from "../entity/user";

@Component()
export class UserService {

    findAll(): User[] {
        return [];
    }
}