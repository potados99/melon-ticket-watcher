import Seat from '../model/Seat';

type NotifyParams = {
  date: Date,
  activatedSeats: Seat[],
  deactivatedSeats: Seat[]
};

export default class Notifier {
  constructor(
    private readonly productId: number,
    private readonly slackWebhookUrl: string
  ) {
  }

  async notify(params: NotifyParams) {
    console.log(params);
  }
}
