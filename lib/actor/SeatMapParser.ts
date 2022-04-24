import Seat from '../model/Seat';
import Section from '../model/Section';
import SectionParser from './SectionParser';

export default class SeatMapParser {
  constructor(private readonly rawSeatMap: any) {}

  allSeats(): Seat[] {
    const sections = new SectionParser(this.rawSeatMap).allSections();

    return this.rawSeatMap.seatData.st
      .flatMap((el: any) => el.ss)
      .map((raw: any) => this.buildSeat(raw, sections))
      .filter((s: Seat) => s.valid);
  }

  /**
   * API 응답의 raw json으로부터 좌석 엔티티를 하나 만들어옵니다.
   *
   * 작은 공연의 경우 구역이 하나이며, 좌석 오브젝트의 rn 필드를 통해 열 정보를 나타내지만,
   * 대형 공연의 경우 층과 열을 합쳐 하나의 구역으로 보기 때문에 rn 필드를 사용하지 않습니다.
   * 이 경우 sid에서 _ 구분자로 나뉜 왼쪽 부분을 통해 구역 id를 꺼내와 해당 구역의 열 정보를 꺼내옵니다.
   *
   * @param sid 이 좌석의 식별자를 나타내는 필드. 유일한 식별자로 기능합니다.
   * @param rn (optional)열을 나타내는 필드. 열을 구역 정보로 다루는 경우 빈 스트링만 옵니다.
   * @param sn 좌석 번호를 나타내는 필드. 예를 들어 A열 31번이면 sn은 '31'입니다.
   * @param sl 현재 예매 가능한지 나타내는 필드. 값이 'Y' 이면 예매 가능함을 나타냅니다. 아니면 'N'.
   * @param gn 좌석의 등급을 나타내는 필드.
   * @param sections 층 및 열(rn이 빈 경우) 정보를 꺼내오기 위해 참조할 전체 구역 정보.
   */
  private buildSeat({sid, rn, sn, sl, gn}: any, sections: Section[]) {
    const sectionId = Number.parseInt(sid.split('_')[0]);
    const sectionOfThisSeat = sections.find((s) => s.id === sectionId);

    if (sectionOfThisSeat == null) {
      throw new Error(`이 좌석에 해당하는 구역 정보를 찾을 수 없습니다.`);
    }

    return Seat.create({
      id: sid,

      grade: gn,
      floor: sectionOfThisSeat?.floor,

      row: rn === '' ? sectionOfThisSeat.row : rn,
      column: sn,

      available: sl === 'Y',
    });
  }

  availableSeats(): Seat[] {
    return this.allSeats().filter((s) => s.available);
  }
}
