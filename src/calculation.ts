import { FormService } from './form.service';
import { Property } from './property';

export class Calculation {
  static pointMap: { [key: string]: number } = {};
  static voteMap: { [key: string]: number } = {};
  static nameArray: string[] = [];
  static itemNumber: number;

  /* initialize & set data */
  static initialize(column: string) {
    // count point of some works .
    this.pointMap[column] = 0;
    // count vote .
    this.voteMap[column] = 0;
  }

  /*  */
  static getFormColumn(prop: Property, itemRes: Object): void {
    // number of the work
    this.itemNumber = prop.item;
    let count = 1;
    for (let item in itemRes) {
      let itemResponse = itemRes[item];
      let nameColumn = FormService.getColumn(itemResponse);
      this.initialize(this.replaceLetter(nameColumn));
      if (this.itemNumber == count) break;
      count++;
    }
    //for debug
    // for (let key in this.pointMap) {
    //   Logger.log(key + '---' + this.pointMap[key]);
    // }
    // Logger.log(this.itemNumber + '個');
  }

  static getFormData(form: Object): void {
    for (let items in form) {
      let formRes = form[items],
        itemRes = formRes.getItemResponses();

      for (let item in itemRes) {
        let itemResponse = itemRes[item];
        this.devideTop3(itemResponse);
      }
    }
  }

  /* judge top3 rows */
  static devideTop3(itemResponse: any): void {
    let nameColumn = FormService.getColumn(itemResponse);
    let workNumber = this.replaceLetter(itemResponse.getResponse());

    switch (nameColumn) {
      case '１位' || '1位':
        this.pointCalc(3, workNumber);
        break;

      case '２位' || '2位':
        this.pointCalc(2, workNumber);
        break;

      case '３位' || '3位':
        this.pointCalc(1, workNumber);
        break;
    }
  }

  /* sum point & vote point */
  static pointCalc(point: number, num: string): void {
    this.pointMap[num] += point;
    this.voteMap[num] += 1;
  }

  /* split letter */
  static replaceLetter(letter: string): string {
    let titleNumber = letter.split('.');
    return titleNumber[0].replace(/番/g, '');
  }

  /* if null, gives name */
  static pushData(itemRes: Object): void {
    for (let item in itemRes) {
      let row = itemRes[item].getItem().getTitle();
      let rowTitle: string = row.split('.')[1];
      if (typeof rowTitle === undefined || null) rowTitle = '無名';
      this.nameArray.push(rowTitle);
      if (this.itemNumber - 1 <= Number(item)) break;
    }
  }

  static print(): void {
    let indexCount = 0;
    for (let key in (this.pointMap, this.voteMap)) {
      Logger.log(
        key +
          '番目の作品 : ' + //作品名 ->' +
          // this.nameArray[indexCount] +
          '\t' +
          ', 総合点 : ' +
          this.pointMap[key] +
          '点：（' +
          this.voteMap[key] +
          '票）'
      );
      indexCount++;
    }
  }

  /* check number 1 */
  static top1(): void {
    let max: number = 0;
    let getKey: string = '0';
    for (let key in this.pointMap) {
      if (max <= this.pointMap[key]) max = this.pointMap[key];
      // Logger.log(String(max - 1));
    }
    for (let key in this.pointMap) {
      if (this.pointMap[key] == max) {
        getKey = key;
        break;
      }
    }
    Logger.log('------------------------------------------------------');
    Logger.log('１位：' + max + '点で' + getKey + '番の人です');
  }
}
