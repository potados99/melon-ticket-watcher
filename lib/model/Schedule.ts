import Seat from './Seat';
import {format} from 'date-fns';
import BaseModel from './BaseModel';
import PerfRepository from '../actor/PerfRepository';

export default class Schedule extends BaseModel {
  date: Date;
  scheduleNo: number;

  seats: Seat[] = [];

  async fetchSeats(repository: PerfRepository) {
    this.seats = await repository.getSeats(this.scheduleNo);
  }

  toString(): string {
    return `${format(this.date, 'yyyy.MM.dd HH:mm')} ${
      this.seats.filter((s) => s.available).length
    }석`;
  }
}
