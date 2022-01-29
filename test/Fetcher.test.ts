import Fetcher from '../lib/actor/Fetcher';

describe('Fetcher 기본 기능', () => {
  const fetcher = new Fetcher(206538);

  it('스케줄 fetching', async () => {
    console.log(await fetcher.fetchSchedules());
  });

  it('좌석 맵 fetching', async () => {
    console.log(await fetcher.fetchSeatMap(100001));
  });
});
