import Schedule from '../model/Schedule';
import Seat from '../model/Seat';

export default class Detector {
  constructor(
    private readonly scheduleBefore: Schedule,
    private readonly scheduleAfter: Schedule
  ) {
  }

  get hasNoChanges(): Boolean {
    return this.diff() === 0 && this.activatedSeats().length === 0 && this.deactivatedSeats().length === 0;
  }

  get hasChanges(): Boolean {
    return !this.hasNoChanges;
  }

  diff(): number {
    return this.scheduleAfter.availableSeats - this.scheduleBefore.availableSeats;
  }

  activatedSeats(): Seat[] {
    return this
      .scheduleAfter
      .seats
      .filter(s =>
        s.available &&
        !this
          .scheduleBefore
          .seats
          .filter(ss => ss.available)
          .map(ss => ss.id)
          .includes(s.id)
      );
  }

  deactivatedSeats(): Seat[] {
    return this
      .scheduleAfter
      .seats
      .filter(s =>
        !s.available &&
        this
          .scheduleBefore
          .seats
          .filter(ss => ss.available)
          .map(ss => ss.id)
          .includes(s.id)
      );
  }
}
