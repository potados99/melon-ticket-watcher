import Config from '../Config';
import Detector from './Detector';
import Notifier from './Notifier';
import Schedule from '../model/Schedule';
import PerfRepository from './PerfRepository';

export default class Worker {
  constructor(
    private readonly repo: PerfRepository,
    private readonly notifier: Notifier,
    private readonly config: Config
  ) {}

  private previousSchedules: Schedule[] = [];

  async tick() {
    const schedules = await this.fetchEmAll();

    process.stdout.write('.');

    if (this.previousSchedules.length === 0) {
      process.stdout.write('!');
      await this.notifier.notifyText('!');

      this.previousSchedules = schedules;
      return;
    }

    for (const current of schedules) {
      await this.detectAndNotify(current);
    }

    this.previousSchedules = schedules;
  }

  private async fetchEmAll() {
    const allSchedules = await this.repo.getSchedules();
    const schedules =
      this.config.scheduleNo == null
        ? allSchedules
        : allSchedules.filter((s) => s.scheduleNo === this.config.scheduleNo);

    if (schedules.length === 0) {
      throw new Error('진행하는 공연 회차가 없습니다. 실행 옵션을 확인해주세요!');
    }

    await Promise.all(schedules.map((s) => s.fetchSeats(this.repo)));

    return schedules;
  }

  private async detectAndNotify(current: Schedule) {
    const prev = this.previousSchedules.find((s) => s.scheduleNo === current.scheduleNo);
    if (prev == null) {
      return;
    }

    const detector = new Detector(prev, current);
    if (detector.hasNoChanges) {
      return;
    }

    process.stdout.write('_');

    await this.notifier.notify({
      schedule: current,
      activatedSeats: detector.activatedSeats(),
      deactivatedSeats: detector.deactivatedSeats(),
    });
  }
}
