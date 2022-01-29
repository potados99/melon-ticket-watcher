import PerfRepository from './lib/model/PerfRepository';
import Fetcher from './lib/actor/Fetcher';
import Notifier from './lib/actor/Notifier';
import Worker from './lib/actor/Worker';
import {sleep} from './lib/common/utils';

async function start() {
  const fetcher = new Fetcher(206483);
  const repo = new PerfRepository(fetcher);

  const notifier = new Notifier();
  const worker = new Worker(repo, notifier);

  while (true) {
    await worker.detectChanges();

    await sleep(1000);
  }
}

start();
