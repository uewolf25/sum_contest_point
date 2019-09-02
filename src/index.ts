import { SheetService } from './sheet.service';
import { FormService } from './form.service';
import { Calculation } from './calculation';
// main
declare var global: any;

global.createNewFile = (): void => {
  const sheet = SheetService.getSheet(SSURL).getName();
  const form = FormService.getForm(FURL).getResponses();
  let formColumn = form[0].getItemResponses(); //カラムの情報が入っている。->配列

  Calculation.getFormColumn(formColumn);
  Calculation.getFormData(form);
  Calculation.print();
};
