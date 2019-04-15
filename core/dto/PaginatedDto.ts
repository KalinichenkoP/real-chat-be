export class PaginatedDto {
    readonly limit?: number;
    readonly offset?: number;

    constructor(data: { limit?: number, offset?: number }) {
        if (data.limit) {
            this.limit = data.limit;
        }

        if (data.offset) {
            this.offset = data.offset;
        }
    }
}
