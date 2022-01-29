import PerfRepository from '../model/PerfRepository';
import Schedule from '../model/Schedule';
import Detector from './Detector';
import Notifier from './Notifier';

export default class Worker {
  constructor(
    private readonly repo: PerfRepository,
    private readonly notifier: Notifier
  ) {
  }

  private previousSchedules: Schedule[] = [];

  async detectChanges() {
    const schedules = await this.repo.getSchedules();

    await Promise.all(schedules.map(s => s.fetchSeats(this.repo)));

    console.log('Fetch 완료.');

    if (this.previousSchedules.length === 0) {
      console.debug('인메모리 저장소 활성화');
      this.previousSchedules = schedules;
      return;
    }

    for (const current of schedules) {
      const prev = this.previousSchedules.find(s => s.scheduleNo === current.scheduleNo);
      if (prev == null) {
        continue;
      }

      const detector = new Detector(prev, current);

      if (detector.hasNoChanges) {
        console.debug(`${current.toString()} 변화 없음.`);
        continue;
      }

      await this.notifier.notify({
        date: current.date,
        activatedSeats: detector.activatedSeats(),
        deactivatedSeats: detector.deactivatedSeats()
      });
    }

    this.previousSchedules = schedules;
  }
}
