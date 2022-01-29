import SeatMapParser from '../lib/actor/SeatMapParser';
import Fetcher from '../lib/actor/Fetcher';

describe('좌석 맵 해석', () => {
  it('예약 가능 좌석 가져오기', async () => {
    console.log(new SeatMapParser(await new Fetcher(206538).fetchSeatMap(100001)).availableSeats().map(s => s.toString()));
  });
});
