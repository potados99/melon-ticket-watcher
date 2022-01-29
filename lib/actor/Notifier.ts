import Seat from '../model/Seat';

type NotifyParams = {
  date: Date,
  activatedSeats: Seat[],
  deactivatedSeats: Seat[]
};

export default class Notifier {
  async notify(params: NotifyParams) {
    console.log(params);
  }
}
