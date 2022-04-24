import Seat from '../lib/model/Seat';
import Detector from '../lib/actor/Detector';
import Schedule from '../lib/model/Schedule';

describe('Detector 감지!', () => {
  it('좌석 하나가 생길 때', async () => {
    const scheduleBefore = Schedule.create({
      date: new Date(),
      scheduleNo: 1,
    });

    const scheduleAfter = Schedule.create({
      date: new Date(),
      scheduleNo: 2,
    });

    scheduleBefore.seats = [
      Seat.create({id: 's1', grade: '전석', row: 'A', column: '1', available: true}),
      Seat.create({id: 's2', grade: '전석', row: 'A', column: '2', available: false}),
    ];

    scheduleAfter.seats = [
      Seat.create({id: 's1', grade: '전석', row: 'A', column: '1', available: true}),
      Seat.create({id: 's2', grade: '전석', row: 'A', column: '2', available: true}),
    ];

    const detector = new Detector(scheduleBefore, scheduleAfter);

    expect(detector.hasChanges).toBe(true);
    expect(detector.activatedSeats()[0].id).toBe('s2');
  });

  it('좌석 하나가 사라질 때', async () => {
    const scheduleBefore = Schedule.create({
      date: new Date(),
      scheduleNo: 1,
    });

    const scheduleAfter = Schedule.create({
      date: new Date(),
      scheduleNo: 2,
    });

    scheduleBefore.seats = [
      Seat.create({id: 's1', grade: '전석', row: 'A', column: '1', available: true}),
      Seat.create({id: 's2', grade: '전석', row: 'A', column: '2', available: true}),
    ];

    scheduleAfter.seats = [
      Seat.create({id: 's1', grade: '전석', row: 'A', column: '1', available: true}),
      Seat.create({id: 's2', grade: '전석', row: 'A', column: '2', available: false}),
    ];

    const detector = new Detector(scheduleBefore, scheduleAfter);

    expect(detector.hasChanges).toBe(true);
    expect(detector.deactivatedSeats()[0].id).toBe('s2');
  });
});
