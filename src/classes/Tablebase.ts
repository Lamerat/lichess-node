import BaseClass from './BaseClass.js';
import { tableBaseResponse } from '../types.js';

export default class Tablebase extends BaseClass {
  public async lookup(variant: 'standard' | 'atomic' | 'antichess', fen: string, ): Promise<tableBaseResponse> {
    try {
      if (!variant || typeof variant !== 'string' || !variant.trim()) throw new Error(`Missing or invalid option 'variant'. Must be valid string!`);
      if (!fen || typeof fen !== 'string' || !fen.trim()) throw new Error(`Missing or invalid option 'fen'. Must be valid string!`);
      
      const result = await this.request.get(`${this.table}/${variant}?fen=${fen}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}