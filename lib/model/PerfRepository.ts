import Schedule from './Schedule';
import Fetcher from '../actor/Fetcher';
import Seat from './Seat';
import ScheduleParser from '../actor/ScheduleParser';
import SeatMapParser from '../actor/SeatMapParser';

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
