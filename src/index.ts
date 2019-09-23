import { SheetService } from './sheet.service';
import { FormService } from './form.service';
import { Calculation } from './calculation';
import { Property } from './property';
// main
declare var global: any;

global.main_sumPoint = (): void => {
  const prop: Property = new Property();

  const sheet = SheetService.getSheet(prop.sheet).getName();
  const form = FormService.getForm(prop.form).getResponses();
  let formRows = form[0].getItemResponses();

  Calculation.getFormColumn(prop, formRows);
  Calculation.pushData(formRows);
  Calculation.getFormData(form);
  Calculation.print();
  Calculation.top1();
};
