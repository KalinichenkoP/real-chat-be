export class PaginationDto {
    readonly total: number;

    constructor(total: number) {
        this.total = total;
    }
}
