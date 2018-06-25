export interface Factory<T> {
    create(value: any): T;
}
