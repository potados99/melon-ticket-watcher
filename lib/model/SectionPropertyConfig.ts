import BaseModel from './BaseModel';

/**
 * 이 좌석 맵에서 사용할 구역의 속성들을 나타냅니다.
 * seatData.snt 필드를 그대로 모델링하는 클래스입니다.
 *
 * 멜론티켓 API는 가변적인 구역 속성을 다루기 위해
 * a, r, e, f, n 속성에 각각 이름(기능)과 사용 여부를 할당합니다.
 * 이 클래스는 a에 대응하는 paramA, r에 대응하는 paramR, ... , n에 대응하는 paramN 필드를 가지며,
 * 사용되는 속성이라면 대응되는 필드에 그 속성의 이름을, 그렇지 않다면 대응 필드에 undefined를 설정합니다.
 */
export default class SectionPropertyConfig extends BaseModel {
  paramA?: string;
  paramR?: string;
  paramE?: string;
  paramF?: string;
  paramN?: string;

  static fromRawJsonSntField({a, r, e, f, n}: any) {
    return this.create({
      paramA: a.use === 'Y' ? a.name : undefined,
      paramR: r.use === 'Y' ? r.name : undefined,
      paramE: e.use === 'Y' ? e.name : undefined,
      paramF: f.use === 'Y' ? f.name : undefined,
      paramN: n.use === 'Y' ? n.name : undefined,
    });
  }
}
