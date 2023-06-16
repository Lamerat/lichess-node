import BaseClass from './BaseClass.js';
import { studyQuery, pngJSON, StudyMetadata } from '../types.js';
import { IncomingHttpHeaders } from 'http';

export default class Studies extends BaseClass {
  /** Download one study chapter in PGN format */
  public async exportOneStudyChapter<formatValue extends 'png' | 'json'>(studyId: string, chapterId: string, format: formatValue, options?: studyQuery) {
    try {
      if (!studyId || typeof studyId !== 'string' || !studyId.trim() || studyId.length !== 8) throw new Error(`Invalid or missing param 'studyId'. Must be 8 characters string!`);
      if (!chapterId || typeof chapterId !== 'string' || !chapterId.trim() || chapterId.length !== 8) throw new Error(`Invalid or missing param 'chapterId'. Must be 8 characters string!`);

      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`));
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const data = await this.request.get(`${this.api}/study/${studyId}/${chapterId}.pgn${query}`);
      const result = format === 'json' ? this.pngParser(data.body) : data.body;

      type resType = formatValue extends 'png' ? string : pngJSON;

      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Download all chapters of a study in PGN format */
  public async exportAllChapters<formatValue extends 'png' | 'json'>(studyId: string, format: formatValue, options?: studyQuery) {
    try {
      if (!studyId || typeof studyId !== 'string' || !studyId.trim() || studyId.length !== 8) throw new Error(`Invalid or missing param 'studyId'. Must be 8 characters string!`);

      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`));
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const data = await this.request.get(`${this.api}/study/${studyId}.pgn${query}`);
      const transformed = data.body.split('[Event').map(x => '[Event' + x).map(x => x.trim());
      const result = format === 'json' ? transformed.map(x => this.pngParser(x)) : transformed;

      type resType = formatValue extends 'png' ? string[] : pngJSON[];

      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Only get the study headers, including Last-Modified */
  public async studyMetadata(studyId: string): Promise<IncomingHttpHeaders> {
    try {
      if (!studyId || typeof studyId !== 'string' || !studyId.trim() || studyId.length !== 8) throw new Error(`Invalid or missing param 'studyId'. Must be 8 characters string!`);
      
      const data = await this.request.head(`${this.api}/study/${studyId}.pgn`);

      return Promise.resolve(data.headers);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async exportAllStudiesUser<formatValue extends 'png' | 'json'>(username: string, format: formatValue, options?: studyQuery) {
    try {
      if (!username || typeof username !== 'string' || !username.trim()) throw new Error(`Invalid or missing param 'username'. Must be string!`);

      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`));
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const data = await this.request.get(`${this.studyAddress}/by/${username}/export.pgn${query}`);
      const transformed = data.body.split('[Event').map(x => '[Event' + x).map(x => x.trim());
      const result = format === 'json' ? transformed.map(x => this.pngParser(x)) : transformed;

      type resType = formatValue extends 'png' ? string[] : pngJSON[];

      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async listStudiesUser(username: string, limit: number): Promise<StudyMetadata[]> {
    try {
      if (!username || typeof username !== 'string' || !username.trim()) throw new Error(`Invalid or missing param 'username'. Must be string!`);
      if (typeof limit !== 'number' || limit < 1) throw new Error(`Invalid option 'limit'. Must be number bigger for zero`);

      const data = await this.gotStream(`${this.api}/study/by/${username}`, limit);
      const result = JSON.parse(JSON.stringify(data));
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}