export default class Seat {
  constructor(
    readonly row: string,
    readonly column: number
  ) {
  }

  toString(): string {
    return `${this.row} 열 ${this.column} 번`;
  }
}
