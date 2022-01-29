import Seat from './Seat';
import PerfRepository from './PerfRepository';
import {format, parse} from 'date-fns';

export default class Schedule {
  seats: Seat[] = [];

  constructor(
    readonly date: Date,
    readonly scheduleNo: number
  ) {
  }

  static fromRawSchedule(perfTime: any): Schedule {
    return new Schedule(
      parse(`${perfTime.perfDay} ${perfTime.perfTime}`, 'yyyyMMdd HHmm', new Date()),
      Number.parseInt(perfTime.scheduleNo)
    );
  }

  async fetchSeats(repository: PerfRepository) {
    this.seats = await repository.getSeats(this.scheduleNo);
  }

  toString(): string {
    return `${format(this.date, 'yyyy.MM.dd HH:mm')} ${this.seats.filter(s => s.available).length}석`;
  }
}
