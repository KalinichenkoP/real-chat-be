import { PaginatedDto } from "../../../core/dto/PaginatedDto";

export class FindMessagesDto extends PaginatedDto {

    constructor(data: { limit?: number, offset?: number }) {
        super(data);
    }
}
