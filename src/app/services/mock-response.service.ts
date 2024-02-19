import { AxiosHeaders, AxiosResponse } from "axios";

export class MockResponse {
  statusCode: number;
  data: any;
  metadata?: any;

  constructor(statusCode = 200, data: any, metadata = undefined) {
    this.statusCode = statusCode;
    this.data = data;
    this.metadata = metadata;
  }

  async create(): Promise<AxiosResponse> {
    return {
      status: this.statusCode,
      statusText: 'OK',
      data: {
        statusCode: this.statusCode,

      },
      headers: AxiosHeaders.from({}),
      config: {
        decompress: true,
        headers: AxiosHeaders.from({}) 
      },
    };
  }
}
