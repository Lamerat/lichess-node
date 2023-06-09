import BaseClass from './BaseClass.js';
import { studyQuery, pngJSON } from '../types.js';

export default class Studies extends BaseClass {
  public async exportOneStudyChapter<formatValue extends 'png' | 'json'>(studyId: string, chapterId: string, format: formatValue, options?: studyQuery) {
    try {
      if (!studyId || typeof studyId !== 'string' || !studyId.trim() || studyId.length !== 8) throw new Error(`Invalid or missing param 'studyId'. Must be 8 characters string!`)
      if (!chapterId || typeof chapterId !== 'string' || !chapterId.trim() || chapterId.length !== 8) throw new Error(`Invalid or missing param 'chapterId'. Must be 8 characters string!`)

      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`))
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const data = await this.request.get(`${this.api}/study/${studyId}/${chapterId}.pgn${query}`);
      const result = format === 'json' ? this.pngParser(data.body) : data.body

      type resType = formatValue extends 'png' ? string : pngJSON;

      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}