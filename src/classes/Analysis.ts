import BaseClass from './BaseClass.js';
import { analysisRequest, analysisResponse } from '../types.js';

export default class Analysis extends BaseClass {
  public async getCloudEvaluation(options?: analysisRequest): Promise<analysisResponse> {
    try {
      const { fen, multiPv, variant } = options

      const queryArray = []

      if (!fen || typeof fen !== 'string' || !fen.trim()) throw new Error(`Missing or invalid option 'fen'. Must be valid string!`)
      queryArray.push(`?fen=${fen}`)

      if (multiPv) queryArray.push(`multiPv=${multiPv}`)
      if (variant) queryArray.push(`variant=${variant}`)
      const query = queryArray.join('&')
      
      const result = await this.request.get(`${this.api}/cloud-eval${query}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}