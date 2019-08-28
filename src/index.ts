import { SheetService } from './sheet.service';

declare var global: any;

global.createNewFile = (): void => {
  SheetService.createSS('fawefawe');
  // const ss = SheetService.createInitialFile('fwaefawejfia');
  // ss.getRange('A4').setValue('Happy gas!');
  // Logger.log(ss.getName());
};
