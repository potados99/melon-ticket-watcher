import Schedule from '../lib/model/Schedule';
import Seat from '../lib/model/Seat';
import Detector from '../lib/actor/Detector';

describe('Detector 감지!', () => {
  it('좌석 하나가 생길 때', async () => {
    const scheduleBefore = new Schedule(new Date(), 1, 1);
    const scheduleAfter = new Schedule(new Date(), 1, 2);

    scheduleBefore.seats = [
      new Seat("s1", "A", "1", true),
      new Seat("s2", "A", "2", false),
    ];

    scheduleAfter.seats = [
      new Seat("s1", "A", "1", true),
      new Seat("s2", "A", "2", true),
    ];

    const detector = new Detector(scheduleBefore, scheduleAfter);

    expect(detector.diff()).toBe(1);
    expect(detector.activatedSeats()[0].id).toBe('s2');
  });

  it('좌석 하나가 사라질 때', async () => {
    const scheduleBefore = new Schedule(new Date(), 1, 2);
    const scheduleAfter = new Schedule(new Date(), 1, 1);

    scheduleBefore.seats = [
      new Seat("s1", "A", "1", true),
      new Seat("s2", "A", "2", true),
    ];

    scheduleAfter.seats = [
      new Seat("s1", "A", "1", true),
      new Seat("s2", "A", "2", false),
    ];

    const detector = new Detector(scheduleBefore, scheduleAfter);

    expect(detector.diff()).toBe(-1);
    expect(detector.deactivatedSeats()[0].id).toBe('s2');
  });
});
