import fetch from 'node-fetch';
import Seat from '../model/Seat';
import Schedule from '../model/Schedule';

type NotifyParams = {
  schedule: Schedule,
  activatedSeats: Seat[],
  deactivatedSeats: Seat[]
};

export default class Notifier {
  constructor(
    private readonly productId: number,
    private readonly slackWebhookUrl: string
  ) {
  }

  async notifyText(message: string) {
    await this.postToSlack(message);
  }

  async notify({schedule, activatedSeats, deactivatedSeats}: NotifyParams) {
    const added = activatedSeats.length > 0 ? `${activatedSeats.map(s => s.toString()).join(', ')} 생김\n` : '';
    const gone = deactivatedSeats.length > 0 ? `${deactivatedSeats.map(s => s.toString()).join(', ')} 사라짐\n` : '';

    await this.postToSlack(`${added}${gone}${schedule.toString()}`);
  }

  private async postToSlack(text: string) {
    await fetch(this.slackWebhookUrl, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({text}),
    });
  }
}
