import { PaginatedDto } from "../../../core/dto/PaginatedDto";

export class FindUsersDto extends PaginatedDto {
    readonly search?: string;

    constructor(data: { limit?: number, offset?: number, search?: string }) {
        super(data);

        if (data.search) {
            this.search = data.search;
        }
    }
}
