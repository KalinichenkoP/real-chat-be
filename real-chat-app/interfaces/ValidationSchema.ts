export interface ValidationSchema {
    readonly type: number;
    readonly validator: {(any): Promise<any>};
}

export interface ValidationDescriptor {
    readonly valid: boolean;
    readonly reason: string;
}
