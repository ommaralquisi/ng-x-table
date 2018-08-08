import { InMemoryDbService } from 'angular-in-memory-web-api';

import {getNames} from './names';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      names: getNames()
    };
  }
}
