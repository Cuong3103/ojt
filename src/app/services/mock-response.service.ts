import { AxiosHeaders, AxiosResponse } from "axios";

export type MetadataResponse = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  total: number;
};

export class MockResponse {
  statusCode: number;
  data: any;
  metadata?: MetadataResponse;

  constructor(statusCode = 200, data: any, metadata?: MetadataResponse) {
    this.statusCode = statusCode;
    this.data = data;
    this.metadata = metadata;
  }

  async create(): Promise<AxiosResponse> {
    return {
      status: this.statusCode,
      statusText: "OK",
      data: {
        data: this.data,
        metdata: this.metadata,
      },
      headers: AxiosHeaders.from({}),
      config: {
        decompress: true,
        headers: AxiosHeaders.from({}),
      },
    };
  }
}

export class MockDataService<T> {
  private data: T[];
  private response: MockResponse;
  private limit: number;
  private currentPage: number;

  constructor(
    private dataGenerator: (index: number) => T,
    private count: number,
    limit: number = 10,
    currentPage: number = 1
  ) {
    this.limit = limit;
    this.currentPage = currentPage;
    this.data = Array.from({ length: count }, (_, index) =>
      dataGenerator(index)
    );
    this.response = this.createMockResponse();
  }

  private createMockResponse(): MockResponse {
    const start = this.currentPage * this.limit;
    const end = start + this.limit;
    const paginatedData = this.data.slice(start, end);
    const hasNextPage = end < this.data.length;
    const hasPrevPage = start > 0;

    return new MockResponse(200, paginatedData, {
      hasNextPage,
      hasPrevPage,
      limit: this.limit,
      total: this.data.length,
    });
  }

  public getMockResponse(): MockResponse {
    return this.response;
  }

  public setPage(page: number): void {
    this.currentPage = page;
    this.response = this.createMockResponse();
  }
}
