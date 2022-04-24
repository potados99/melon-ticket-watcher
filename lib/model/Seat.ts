import BaseModel from './BaseModel';

/**
 * 좌석을 나타냅니다.
 */
export default class Seat extends BaseModel {
  id: string;

  grade: string;
  floor?: string;

  row: string;
  column: string;

  available: Boolean;

  /**
   * 이 좌석이 유효한 좌석인지 여부를 나타냅니다.
   * 예매 가능 여부와는 관계없습니다.
   *
   * 일단 raw 데이터로부터 Seat 엔티티를 구성한 다음에 그 유효성을 검증하는 구조입니다.
   * 따라서 엔티티는 존재 자체로 유효하다고 보장할 수 없기에 이 검증 메소드를 두었습니다.
   */
  get valid(): Boolean {
    return this.row !== '' && this.column !== '-1';
  }

  toString(): string {
    return [`${this.grade}`, this.floor && `${this.floor}층`, `${this.row}열`, `${this.column}번`]
      .filter((part) => part)
      .join(' ');
  }

  toNormalizedString(): string {
    return `${this.row}-${this.column}`;
  }
}
