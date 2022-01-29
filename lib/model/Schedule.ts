import Seat from './Seat';
import PerfRepository from './PerfRepository';
import {parse, format} from 'date-fns';

export default class Schedule {
  seats: Seat[] = [];

  constructor(
    readonly date: Date,
    readonly scheduleNo: number,
    readonly availableSeats: number
  ) {
  }

  static fromRawSchedule(perfTime: any): Schedule {
    return new Schedule(
      parse(`${perfTime.perfDay} ${perfTime.perfTime}`, 'yyyyMMdd HHmm', new Date()),
      Number.parseInt(perfTime.scheduleNo),
      perfTime.seatGradelist
        .map((g: any) => Number.parseInt(g.realSeatCntlk))
        .reduce((acc: number, n: number) => acc + n)
    );
  }

  async fetchSeats(repository: PerfRepository) {
    this.seats = await repository.getSeats(this.scheduleNo);
  }

  toString(): string {
    return `${format(this.date, 'yyyy.MM.dd HH:mm')} ${this.availableSeats}석`;
  }
}
