import { PaginationDto } from "./PaginationDto";

export class ListResponseDto<T> {
    readonly data: T[];
    readonly pagination: PaginationDto;

    constructor(data: T[], total: number) {
        this.data = data;
        this.pagination = new PaginationDto(total);
    }
}
