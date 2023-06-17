import BaseClass from './BaseClass.js';
import { onlineBots } from '../types.js';

export default class Bot extends BaseClass {
  public async getOnlineBots(nb: number = 20): Promise<onlineBots[]> {
    try {
      if (typeof nb !== 'number' || nb < 1) throw new Error(`Invalid param 'nb'. Must be number >= 1`);

      const data = await this.gotStream(`${this.api}/bot/online?nb=${nb}`, nb);
      const result = JSON.parse(JSON.stringify(data));

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}