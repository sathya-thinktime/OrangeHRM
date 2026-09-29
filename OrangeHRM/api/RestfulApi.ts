import { APIRequestContext } from '@playwright/test';

export class RestfulApi {
  protected request: APIRequestContext;
  protected baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL =
      process.env.API_BASE_URL || 'https://api.restful-api.dev';
  }
}