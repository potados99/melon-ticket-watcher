import Config from '../lib/Config';
import Fetcher from '../lib/actor/Fetcher';
import SectionParser from '../lib/actor/SectionParser';

describe('구역 해석', () => {
  it('모든 구역 정보 가져오기', async () => {
    console.log(
      new SectionParser(await new Fetcher(Config.of({productId: 206790})).fetchSeatMap(100006))
        //new SectionParser(await new Fetcher(Config.of({productId: 206743})).fetchSeatMap(100001))
        .allSections()
        .map((s) => s.toString())
    );
  });
});
