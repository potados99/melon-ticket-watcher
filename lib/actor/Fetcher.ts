import fetch from 'node-fetch';
import {interceptParameter} from '../common/utils';

export default class Fetcher {
  constructor(private readonly productId: number) {
  }

  private urls = {
    schedules: () => `https://tktapi.melon.com/api/product/schedule/list.json?prodId=${this.productId}&pocCode=SC0003&perfTypeCode=GN0001&sellTypeCode=ST0001&v=1`,
    seats: (scheduleNo: number) => `https://m.ticket.melon.com/tktapi/product/seat/seatMapList.json?v=1&prodId=${this.productId}&scheduleNo=${scheduleNo}&callback=getSeatListCallBack`
  };

  async fetchSchedules(): Promise<any> {
    const response = await fetch(this.urls.schedules());

    return await response.json();
  }

  async fetchSeatMap(scheduleNo: number): Promise<any> {
    const response = await fetch(this.urls.seats(scheduleNo), {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: 'pocCode=SC0003'
    });

    return interceptParameter('getSeatListCallBack', await response.text());
  }
}
