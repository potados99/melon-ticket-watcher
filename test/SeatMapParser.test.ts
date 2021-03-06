import Config from '../lib/Config';
import Fetcher from '../lib/actor/Fetcher';
import SeatMapParser from '../lib/actor/SeatMapParser';

describe('좌석 맵 해석', () => {
  it('예약 가능 좌석 가져오기', async () => {
    console.log(
      new SeatMapParser(await new Fetcher(Config.of({productId: 206790})).fetchSeatMap(100006))
        //new SeatMapParser(await new Fetcher(Config.of({productId: 206743})).fetchSeatMap(100001))
        .availableSeats()
        .map((s) => s.toString())
    );
  });
});
