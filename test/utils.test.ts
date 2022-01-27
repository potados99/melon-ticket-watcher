import {interceptParameter} from '../lib/utils';

describe('유틸리티 잘 작동하나?', () => {
  it('함수 호출 스트링 리터럴에서 인자 빼오기', async () => {
    const result = interceptParameter('hello', 'hello(36);');

    expect(result).toBe(36);
  });
});
