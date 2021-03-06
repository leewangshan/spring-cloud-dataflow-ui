import { ElementComponent } from './shape-component';
import { DocService } from '../../services/doc.service';
import { Constants, Flo } from 'spring-flo';
import { Utils } from './utils';
import { dia } from 'jointjs';

export class NodeComponent extends ElementComponent {

  _description: string;

  constructor(private docService: DocService) {
    super();
  }

  getPropertyValue(property: string): any {
    if (this.view) {
      const value = this.view.model.attr(`props/${property}`);
      if (this.isCode(property)) {
        return Utils.decodeTextFromDSL(value);
      }
      return value;
    }
    return '';
  }

  isCanvas(): boolean {
    return this.paper.model.get('type') === Constants.CANVAS_CONTEXT;
  }

  get paper(): dia.Paper {
    return this.view ? (<any>this.view).paper : undefined;
  }

  get metadata(): Flo.ElementMetadata {
    return this.view ? this.view.model.attr('metadata') : undefined;
  }

  get metaName(): string {
    return this.metadata ? this.metadata.name : 'Unknown';
  }

  get metaGroup(): string {
    return this.metadata ? this.metadata.group : 'Unknown';
  }

  get allProperties(): any {
    return this.view ? this.view.model.attr('props') : {};
  }

  get isPropertiesShown(): boolean {
    return this.view ? !this.view.model.attr('metadata/metadata/hide-tooltip-options') : false;
  }

  get description(): string {
    if (this._description === undefined) {
      if (this.metadata && this.metadata.description) {
        this.metadata.description().then(d => this._description = d);
      }
    }
    return this._description;
  }

  get isDisabled(): boolean {
    return !this.metadata || this.metadata.unresolved || this.docService.isMouseDown();
  }

  isCode(property: string): boolean {
    return Utils.isCodeTypeProperty(this.metadata, property);
  }

  keys(o: any): Array<string> {
    return Object.keys(o);
  }

}
