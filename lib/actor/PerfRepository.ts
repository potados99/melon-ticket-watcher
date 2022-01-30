import Schedule from '../model/Schedule';
import Fetcher from './Fetcher';
import Seat from '../model/Seat';
import ScheduleParser from './ScheduleParser';
import SeatMapParser from './SeatMapParser';

export default class PerfRepository {
  constructor(
    private readonly fetcher: Fetcher
  ) {
  }

  async getSchedules(): Promise<Schedule[]> {
    const fetched = await this.fetcher.fetchSchedules();

    return new ScheduleParser(fetched).allSchedules();
  }

  async getSeats(scheduleNo: number): Promise<Seat[]> {
    const fetched = await this.fetcher.fetchSeatMap(scheduleNo);

    return new SeatMapParser(fetched).allSeats();
  }
}
