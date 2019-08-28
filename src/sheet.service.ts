import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import drive = GoogleAppsScript.Drive.File;
import { getDayFormat } from './util';

export class SheetService {
  static createInitialFile(prefix: string): Spreadsheet {
    const fileName = `${prefix} ${getDayFormat()}`;
    const ss = SpreadsheetApp.create(fileName);
    return ss;
  }
  static createSS(prefix: string): void {
    let FOLDER_ID = '';
    const fileName = `${prefix} ${getDayFormat()}`;
    const ss = SpreadsheetApp.create(fileName).getId();
    const fileSS = DriveApp.getFileById(ss);
    const folder = DriveApp.getFolderById(FOLDER_ID);

    folder.addFile(fileSS);
  }
}
