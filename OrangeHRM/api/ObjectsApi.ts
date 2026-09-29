import { APIRequestContext } from '@playwright/test';
import { RestfulApi } from './RestfulApi';

export class ObjectsApi extends RestfulApi {

  constructor(request: APIRequestContext) {
    super(request);
  }

  async getObjects() {
    return await this.request.get(`${this.baseURL}/objects`);
  }

  async getObject(id: string) {
    return await this.request.get(`${this.baseURL}/objects/${id}`);
  }

  async createObject(data: object) {
    return await this.request.post(`${this.baseURL}/objects`, {
      data
    });
  }

  async updateObject(id: string, data: object) {
    return await this.request.put(`${this.baseURL}/objects/${id}`, {
      data
    });
  }

  async patchObject(id: string, data: object) {
    return await this.request.patch(`${this.baseURL}/objects/${id}`, {
      data
    });
  }

  async deleteObject(id: string) {
    return await this.request.delete(`${this.baseURL}/objects/${id}`);
  }
}