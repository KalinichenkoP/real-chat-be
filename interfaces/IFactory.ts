export interface IFactory<T> {
    create(value: any): T;
}
