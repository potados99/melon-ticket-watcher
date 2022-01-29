import Fetcher from '../lib/actor/Fetcher';
import ScheduleParser from '../lib/actor/ScheduleParser';

describe('스케줄 해석', () => {
  it('예약 가능 시간대 가져오기', async () => {
    console.log(new ScheduleParser(await new Fetcher(206483).fetchSchedules()).allSchedules().map(s => s.toString()));
  });
});
