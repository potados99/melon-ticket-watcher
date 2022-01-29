import Schedule from '../model/Schedule';

export default class ScheduleParser {
  constructor(
    private readonly rawSchedules: any
  ) {
  }

  allSchedules(): Schedule[] {
    return this
      .rawSchedules
      .data
      .perfDaylist
      .flatMap((d: any) => d.perfTimelist)
      .flatMap((t: any) => Schedule.fromRawSchedule(t))
  }
}
