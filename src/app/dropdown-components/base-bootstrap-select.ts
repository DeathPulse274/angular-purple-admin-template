import { Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { BootstrapSelectDirective } from './bootstrap-select.directive';

/**
 * Base class to extend for a bootstrap-select based component
 */
export abstract class BaseBootstrapSelect {

    @ViewChild("BootstrapSelectDirective", { static: true }) bootstrapSelectDirective: BootstrapSelectDirective;

  

  private _options: any[];
  private _optgroups: any[];

  private _mySelections: any | any[];

  // accept a single string or an array of strings to support both single and multiselect
  @Input() public set mySelections(value: any | any[]) {
    this._mySelections = value;
    this.mySelectionsChange.emit(value);

    // this is necessary for bootstrap-select to pickup the current selections
    setTimeout(() => {
      this.bootstrapSelectDirective.refresh();
    });
  }

  public get mySelections() {
    return this._mySelections;
  }

  @Output()
  public mySelectionsChange = new EventEmitter();

  @Input()
  set options(options: any[]) {
    this._options = options;
    setTimeout(() => {
      this.bootstrapSelectDirective.refresh();
    });
  }

  @Input()
  set optgroups(optgroups: any) {
    this._optgroups = optgroups;
  }

  get options() {
    return this._options;
  }

  get optgroups() {
    return this._optgroups;
  }

  selectOptionById(id) {
    this.bootstrapSelectDirective.selectOptionById(id);
  }
}
