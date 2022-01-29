import Seat from '../model/Seat';

export default class SeatMapParser {
  private rawSeats: any[] = this
    .rawSeatMap
    .seatData
    .st
    .flatMap((el: any) => el.ss);

  constructor(private readonly rawSeatMap: any) {
  }

  allSeats(): Seat[] {
    return this.rawSeats
      .map(raw => Seat.fromRawSeat(raw))
      .filter((s: Seat) => s.valid);
  }

  availableSeats(): Seat[] {
    return this.allSeats()
      .filter(s => s.available);
  }
}
