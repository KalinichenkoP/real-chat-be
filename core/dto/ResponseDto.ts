export class ResponseDto<T> {
    readonly data: T;

    constructor(data: T) {
        this.data = data;
    }
}
