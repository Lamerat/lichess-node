import got, { Got } from 'got';
import ndJSON from 'ndjson';
import { pngJSON } from '../types.js';

export default class BaseClass {
  protected headers: { Authorization?: string } = {}
  protected api: string = 'https://lichess.org/api';
  protected explorer: string = 'https://explorer.lichess.ovh'
  protected table: string = 'https://tablebase.lichess.ovh'
  protected gameAddress: string = 'https://lichess.org/game'
  protected studyAddress: string = 'https://lichess.org/study'
  protected request: Got;

  constructor(token: string) {
    if (token) this.headers = { Authorization: `Bearer ${token}` };

    this.request = got.extend({
      headers: this.headers,
      hooks: {
        beforeError: [
          (error: any) => {
            const { response } = error;
            if (response && response.body) {
              error.message = response.body.error || JSON.parse(response.body);
              error.code = response.statusCode;
            }
            return error;
          }
        ]
      },
      mutableDefaults: true
    })
  }

  protected gotStream(url: string, limit: number = 100) {
    return new Promise((resolve, reject) => {
      const result = [];
      let counter = 1;

      const stream = this.request.stream(url, { headers: { ...this.headers } })
        .on('error', (error) => reject(error))
        .pipe(ndJSON.parse())
        .on('data', (data) => {
          result.push(data);
          if (counter >= limit) stream.end();
          counter = counter + 1;
        })
        .on('end', () => resolve(result))
    })
  }

  protected pngParser(png: string) {
    const pngToArray = png.split('\n').filter(x => x);
    const result: pngJSON = {};
    pngToArray.forEach(x => {
      if (x.startsWith('[') && x.endsWith(']')) {
        const [tag, ...rest]: string[] = x.slice(1, x.length - 1).split(' ').map(x => x.replaceAll('"', ''));
        const camelCaseTag = [...tag];
        camelCaseTag[0] = camelCaseTag[0].toLowerCase();
        result[camelCaseTag.join('')] = rest.join(' ');
      } else {
        result.moves = result.moves ? result.moves + x : x;
      }
    })
    return result;
  }
}