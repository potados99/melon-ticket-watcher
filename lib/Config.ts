import {program} from 'commander';

const options = program
  .requiredOption('--product-id <number>', '208789')
  .option('--schedule-no <number>', '100001')
  .requiredOption('--slack-webhook-url <string>', 'https://hooks.slack.com/services/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')
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
