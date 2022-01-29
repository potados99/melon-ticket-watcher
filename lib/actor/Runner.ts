import {program} from 'commander';
import Fetcher from './Fetcher';
import PerfRepository from '../model/PerfRepository';
import Notifier from './Notifier';
import Worker from './Worker';
import {sleep} from '../common/utils';

export default class Runner {
  private options = program
    .requiredOption('--product-id <number>', '멜론티켓 상품 ID')
    .requiredOption('--slack-webhook-url <string>', '슬랙으로 메시지를 보낼 웹 훅 URL')
    .option('--poll-interval-millis <number>', '폴링 간격(밀리초)', '500')
    .option('--seat-expression [string]', '알림 받을 좌석 번호 표현식')
    .parse()
    .opts();

  async run() {
    console.log(this.options);
    console.log('시작');

    const {slackWebhookUrl, pollIntervalMillis, seatExpression} = this.options;
    const productId = Number.parseInt(this.options.productId);
    const interval = parseInt(pollIntervalMillis);

    const fetcher = new Fetcher(productId);
    const repo = new PerfRepository(fetcher);

    const notifier = new Notifier(productId, slackWebhookUrl);
    const worker = new Worker(repo, notifier);

    while (true) {
      await worker.tick();

      await sleep(interval);
    }
  }
}
