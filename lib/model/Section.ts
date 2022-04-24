import BaseModel from './BaseModel';
import SectionPropertyConfig from './SectionPropertyConfig';

/**
 * 구역을 나타냅니다.
 *
 * 멜론티켓의 API는 좌석을 하나로 묶는 '구역' 개념을 사용합니다.
 * 구역은 공연장 전체일 수도 있고, 하나의 열일 수도 있습니다.
 *
 * 만약 하나의 구역이 공연장 전체를 나타내는 경우, 열 정보는 좌석 오브젝트의 속성에 포함됩니다.
 * 반면, 하나의 구역이 하나의 열을 나타내는 경우, 열 정보는 구역의 속성에 포함됩니다.
 * 따라서 좌석의 정보를 모두(층, 열 모두 포함) 꺼내오기 위해서는 해당 좌석이 참조하는 구역 정보가 필요합니다.
 *
 * 이렇게 구역의 속성이 가변적일 수 있음에 대비하기 위해 멜론티켓 API는 독특한 접근 방식을 채택합니다.
 * 좌석 맵 API의 응답 속 seatData.snt 오브젝트에 포함된 a, r, e ,f n 필드는 각각 속성의 사용 여부와 이름을 나타냅니다.
 * 예를 들어 아래와 같습니다:
 *
 *    {
 *     a: {use: 'Y', name: '열'},
 *     r: {use: 'N', name: ''},
 *     e: {use: 'N', name: ''},
 *     f: {use: 'Y', name: '층'},
 *     n: {use: 'Y', name: '번'}
 *    }
 *
 * 이 경우, a, f, n 필드를 각각 '열', '층', '번' 속성으로 사용한다는 선언으로 해석할 수 있습니다.
 * 이 속성들은 seatData.da.sb 아래에 있는 구역 정의에서 사용됩니다:
 *
 *    {
 *      ...
 *      sntv: {
 *        a: 'A',
 *        r: '',
 *        e: '',
 *        f: '1'
 *      },
 *      ...
 *      sbid: 1
 *    }
 *
 * 이 경우를 해석하면 1(sbid) 구역은 1층(f) A열(a)을 나타내고 있음을 알 수 있습니다.
 **/
export default class Section extends BaseModel {
  id: number;

  row?: string;
  floor?: string;

  properties: Map<string, string>;

  override toString() {
    const propsStringified = JSON.stringify(this.properties, (key, value) =>
      value instanceof Map ? [...value] : value
    );

    return `${this.id} 구역(${this.floor}층 ${this.row}열, raw 속성: ${propsStringified})`;
  }
}
