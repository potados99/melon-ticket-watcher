import Seat from './Seat';

export default class SeatMapParser {
  constructor(private readonly rawSeatMap: any) {
  }

  availableSeats(): Seat[] {
    return this.rawSeatMap
      .seatData
      .st
      .flatMap((el: any) => el.ss)
      .filter((seat: any) => seat.sl === 'Y')
      .map((seat: any) => new Seat(seat.rn, seat.sn));
  }
}
