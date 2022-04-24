import Schedule from '../model/Schedule';
import {parse} from 'date-fns';

export default class ScheduleParser {
  constructor(private readonly rawSchedules: any) {}

  allSchedules(): Schedule[] {
    return this.rawSchedules.data.perfDaylist
      .flatMap((d: any) => d.perfTimelist)
      .flatMap((t: any) => this.buildSchedule(t));
  }

  private buildSchedule({perfDay, perfTime, scheduleNo}: any) {
    return Schedule.create({
      date: parse(`${perfDay} ${perfTime}`, 'yyyyMMdd HHmm', new Date()),
      scheduleNo: Number.parseInt(scheduleNo),
    });
  }
}
