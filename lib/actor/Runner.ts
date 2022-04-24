import Worker from './Worker';
import Config from '../Config';
import {sleep} from '../common/utils';
import Fetcher from './Fetcher';
import Notifier from './Notifier';
import PerfRepository from './PerfRepository';

export default class Runner {
  async run() {
    Config.parseCommandLineArguments();

    console.log(Config.current);
    console.log('시작');

    const fetcher = new Fetcher(Config.current);
    const repo = new PerfRepository(fetcher);

    const notifier = new Notifier(Config.current);
    const worker = new Worker(repo, notifier, Config.current);

    while (true) {
      await worker.tick();

      await sleep(Config.current.pollIntervalMillis);
    }
  }
}
