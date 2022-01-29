import Seat from '../model/Seat';

export default class SeatMapParser {
  constructor(private readonly rawSeatMap: any) {
  }

  allSeats(): Seat[] {
    return this
      .rawSeatMap
      .seatData
      .st
      .flatMap((el: any) => el.ss)
      .map((raw: any) => Seat.fromRawSeat(raw))
      .filter((s: Seat) => s.valid);
  }

  availableSeats(): Seat[] {
    return this.allSeats()
      .filter(s => s.available);
  }
}
