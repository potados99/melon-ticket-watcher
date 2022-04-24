import {program} from 'commander';

const options = program
  .requiredOption('--product-id <number>', '멜론티켓 상품 ID')
  .option('--schedule-no <number>', '공연 시간 ID')
  .requiredOption('--slack-webhook-url <string>', '슬랙으로 메시지를 보낼 웹 훅 URL')
  .option('--poll-interval-millis <number>', '폴링 간격(밀리초)', '500');

export default class Config {
  static current: Config;

  readonly productId: number;
  readonly scheduleNo?: number;

  readonly slackWebhookUrl: string;
  readonly pollIntervalMillis: number;

  static parseCommandLineArguments() {
    this.current = Config.fromCommandLineArguments();
  }

  private static fromCommandLineArguments() {
    const opts = options.parse().opts();

    return this.of({
      productId: parseInt(opts.productId),
      scheduleNo: opts.scheduleNo != null ? parseInt(opts.scheduleNo) : undefined,
      slackWebhookUrl: opts.slackWebhookUrl,
      pollIntervalMillis: parseInt(opts.pollIntervalMillis),
    });
  }

  static of(partial: Partial<Config>) {
    return Object.assign(new Config(), partial);
  }
}
