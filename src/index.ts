import { SheetService } from './sheet.service';
import { FormService } from './form.service';
import { Calculation } from './calculation';
// main
declare var global: any;

global.main_sumPoint = (): void => {
  const properties = PropertiesService.getScriptProperties();
  const SHEET_URL = properties.getProperty('SS_URL');
  const FORM_URL = properties.getProperty('GF_URL');
  const sheet = SheetService.getSheet(SHEET_URL).getName();
  const form = FormService.getForm(FORM_URL).getResponses();
  let formRows = form[0].getItemResponses();

  Calculation.getFormColumn(formRows);
  Calculation.pushData(formRows);
  Calculation.getFormData(form);
  Calculation.print();
  Calculation.top1();
};
