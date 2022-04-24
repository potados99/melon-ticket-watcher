import Section from '../model/Section';
import SectionPropertyConfig from '../model/SectionPropertyConfig';

export default class SectionParser {
  constructor(private readonly rawSeatMap: any) {}

  allSections(): Section[] {
    const propConfig = SectionPropertyConfig.fromRawJsonSntField(this.rawSeatMap.seatData.snt);

    return this.rawSeatMap.seatData.da.sb.map((sb: any) => this.buildSection(sb, propConfig));
  }

  /**
   * API 응답의 raw json으로부터 구역 엔티티를 하나 만들어옵니다.
   *
   * 구역의 속성은 가변적이며, a, r, e, f 필드로 정의됩니다.
   * 이러한 속성들이 가지는 의미를 해석하기 위해서,
   * 해당 필드들의 사용 여부와 이름을 파싱하여 머금고 있는 SectionPropertyConfig 인스턴스를 제공받습니다.
   *
   * @param sntv 이 구역의 속성인 a, r, e, f를 포함하고 있는 오브젝트.
   * @param sbid 이 구역의 식별자.
   * @param config 구역 속성의 이름과 사용 여부를 나타내는 설정 인스턴스.
   */
  private buildSection({sntv, sbid}: any, config: SectionPropertyConfig) {
    const props = this.parseSectionProps(sntv, config);

    return Section.create({
      id: sbid,
      row: props.get('열'),
      floor: props.get('층'),
      properties: props,
    });
  }

  private parseSectionProps({a, r, e, f}: any, config: SectionPropertyConfig): Map<string, string> {
    const props = new Map();

    if (a !== '') {
      props.set(config.paramA, a);
    }

    if (r !== '') {
      props.set(config.paramR, r);
    }

    if (e !== '') {
      props.set(config.paramE, e);
    }

    if (f !== '') {
      props.set(config.paramF, f);
    }

    return props;
  }
}
