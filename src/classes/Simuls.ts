import BaseClass from './BaseClass.js';
import { simulsResponse } from '../types.js';

export default class Simuls extends BaseClass {
  public async getCurrentSimuls(): Promise<simulsResponse> {
    try {
      const result = await this.request.get(`${this.api}/simul`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}