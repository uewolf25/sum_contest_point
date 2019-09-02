import Form = GoogleAppsScript.Forms.Form;
import ItemResponse = GoogleAppsScript.Forms.ItemResponse;
// import Items = GoogleAppsScript.Forms.Item;

export class FormService {
  static getForm(prefix: string): Form {
    const url = `${prefix}`;
    const form = FormApp.openByUrl(url);
    return form;
  }
  static getColumn(prefix: ItemResponse): string {
    let item = prefix.getItem().getTitle();
    return item;
  }
}
