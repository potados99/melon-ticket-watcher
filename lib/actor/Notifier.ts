import Seat from '../model/Seat';
import fetch from 'node-fetch';
import Config from '../Config';
import Schedule from '../model/Schedule';

type NotifyParams = {
  schedule: Schedule;
  activatedSeats: Seat[];
  deactivatedSeats: Seat[];
};

export default class Notifier {
  constructor(private readonly config: Config) {}

  async notifyText(message: string) {
    await this.postToSlack(message);
  }

  async notify({schedule, activatedSeats, deactivatedSeats}: NotifyParams) {
    const added =
      activatedSeats.length > 0
        ? `${activatedSeats.map((s) => s.toString()).join(', ')} 생김\n`
        : '';
    const gone =
      deactivatedSeats.length > 0
        ? `${deactivatedSeats.map((s) => s.toString()).join(', ')} 사라짐\n`
        : '';
    const link = `<https://m.ticket.melon.com/public/index.html#performance.index?prodId=${this.config.productId}|바로가기>`;

    await this.postToSlack(`${added}${gone}${schedule.toString()}\n${link}`);
  }

  private async postToSlack(text: string) {
    await fetch(this.config.slackWebhookUrl, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({text}),
    });
  }
}
