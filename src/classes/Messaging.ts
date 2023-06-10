import BaseClass from './BaseClass.js';
import { analysisRequest, analysisResponse } from '../types.js';

export default class Messaging extends BaseClass {
  public async sendPrivateMessage(username: string, text: string): Promise<{ ok: boolean }> {
    try {
      if (!username || typeof username !== 'string' || !username.trim()) throw new Error(`Missing or invalid parameter 'username'. Must be string!`);
      if (!text || typeof text !== 'string' || !text.trim()) throw new Error(`Missing or invalid parameter 'text'. Must be string!`);
      if (!this.headers?.Authorization) throw new Error(`This method require auth token!`)

      const result = await this.request.post(`${this.inbox}/${username}`, { form: { text } });

      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}