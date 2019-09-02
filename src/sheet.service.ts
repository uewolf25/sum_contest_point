import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
// import { getDayFormat } from './util';

export class SheetService {
  static getSheet(prefix: string): Spreadsheet {
    const url = `${prefix}`;
    const ss = SpreadsheetApp.openByUrl(url);
    return ss;
  }
}
