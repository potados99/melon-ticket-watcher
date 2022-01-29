export default class Seat {
  constructor(
    readonly row: string,
    readonly column: string,
    readonly available: Boolean
  ) {
  }

  static fromRawSeat({rn, sn, sl}: any): Seat {
    return new Seat(rn, sn, sl === 'Y');
  }

  get valid(): Boolean {
    return this.row !== "" && this.column !== "-1"
  }

  toString(): string {
    return `${this.row}열 ${this.column}번(${this.available})`;
  }

  toNormalizedString(): string {
    return `${this.row}-${this.column}`;
  }
}
