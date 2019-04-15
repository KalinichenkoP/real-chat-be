export class ApiListResponse<T> {
  readonly data: T[];
  readonly count: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.count = total;
  }
}

