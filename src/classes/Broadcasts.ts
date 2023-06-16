import BaseClass from './BaseClass.js';
import { officialBroadcast } from '../types.js';

export default class Broadcasts extends BaseClass {
  /** Get all incoming, ongoing, and finished official broadcasts. The broadcasts are sorted by start date, most recent first */
  public async getOfficialBroadcasts(nb: number = 20): Promise<officialBroadcast[]> {
    try {
      if (typeof nb !== 'number' || nb < 1) throw new Error(`Invalid param 'nb'. Must be number bigger from zero`);
      
      const data = await this.gotStream(`${this.api}/broadcast?${nb}`, nb);
      const result = JSON.parse(JSON.stringify(data));

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}