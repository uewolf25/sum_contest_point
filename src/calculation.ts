import { FormService } from './form.service';

export class Calculation {
  static properties = PropertiesService.getScriptProperties();
  static pointMap: { [key: string]: number } = {};
  static voteMap: { [key: string]: number } = {};
  static itemNumber: string;

  static initialize(column: string) {
    // count point of some works .
    this.pointMap[column] = 0;
    // count vote .
    this.voteMap[column] = 0;
    // number of the work
    this.itemNumber = this.properties.getProperty('ITEM_NUMBER');
  }

  static getFormColumn(itemRes: Object): void {
    // let count = 1;
    for (let item in itemRes) {
      let itemResponse = itemRes[item];
      let nameColumn = FormService.getColumn(itemResponse);
      this.initialize(this.replaceLetter(nameColumn));
      if (nameColumn == this.itemNumber) break;
    }
    // for debug
    // for (let key in this.pointMap) {
    //   Logger.log(key + '---' + this.pointMap[key]);
    // }
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

  static pointCalc(point: number, num: string): void {
    this.pointMap[num] += point;
    this.voteMap[num] += 1;
  }

  static replaceLetter(letter: string): string {
    return letter.replace(/番/g, '');
  }

  static print(): void {
    for (let key in (this.pointMap, this.voteMap)) {
      Logger.log(
        '総合点' +
          key +
          '番目の作品 → ' +
          this.pointMap[key] +
          '点：（' +
          this.voteMap[key] +
          '票）'
      );
    }
  }

  // check number 1
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
    Logger.log('１位：' + max + '点で' + getKey + '番の人です');
  }
}
