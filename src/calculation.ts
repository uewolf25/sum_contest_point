import { FormService } from './form.service';

export class Calculation {
  static itemNumber = '9';
  static pointMap: { [key: string]: number } = {};
  static voteMap: { [key: string]: number } = {};

  static initialize(column: string) {
    this.pointMap[column] = 0;
    this.voteMap[column] = 0;
  }

  static getFormColumn(itemRes: Object): void {
    for (let item in itemRes) {
      let itemResponse = itemRes[item];
      let nameColumn = FormService.getColumn(itemResponse);
      this.initialize(this.replaceLetter(nameColumn));
      if (nameColumn == this.itemNumber) break;
    }
    //デバッグ用
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
      case '１位':
        this.pointCalc(3, workNumber);
        break;

      case '２位':
        this.pointCalc(2, workNumber);
        break;

      case '３位':
        this.pointCalc(1, workNumber);
        break;
    }
  }

  static pointCalc(point: number, num: string): void {
    this.pointMap[num] += point;
  }

  static replaceLetter(letter: string): string {
    return letter.replace(/番/g, '');
  }

  static print(): void {
    for (let key in this.pointMap) {
      Logger.log(key + '---' + this.pointMap[key]);
    }
  }
}
