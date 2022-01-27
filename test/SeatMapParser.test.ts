import SeatMapParser from '../lib/SeatMapParser';
import Fetcher from '../lib/Fetcher';

describe('좌석 맵 해석', () => {
  it('예약 가능 좌석 가져오기', async () => {
    console.log(new SeatMapParser(await new Fetcher(206483).fetchSeatMap(100001)).availableSeats().map(s => s.toString()));
  });
});
