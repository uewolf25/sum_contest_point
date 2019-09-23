import Prop = GoogleAppsScript.Properties.Properties;

export class Property {
  private _properteis: Prop = PropertiesService.getScriptProperties();
  private _form: string;
  private _sheet: string;
  private _item: string;

  constructor() {
    this._form = this._properteis.getProperty('GF_URL');
    this._sheet = this._properteis.getProperty('SS_URL');
    this._item = this._properteis.getProperty('ITEM_NUMBER');
    this.alert();
  }

  get form(): string {
    return this._form;
  }

  get sheet(): string {
    return this._sheet;
  }

  get item(): number {
    return Number(this._item);
  }

  private alert() {
    if (!this._form) {
      throw 'You should set "GF_URL" property from [File] > [Project properties] > [Script properties]';
    }
    if (!this._sheet) {
      throw 'You should set "SS_URL" property from [File] > [Project properties] > [Script properties]';
    }
    if (!this._item) {
      throw 'You should set "ITEM_NUMBER" property from [File] > [Project properties] > [Script properties]';
    }
  }
}
