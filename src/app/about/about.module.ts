import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about.component';
import { AboutDetailsComponent } from './about-details.component';
import { AboutService } from './about.service';
import { AboutRoutingModule } from './about-routing.module';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports:      [ AboutRoutingModule, SharedModule, ClipboardModule ],
  declarations: [ AboutComponent, AboutDetailsComponent ],
  providers:    [ AboutService ]
})
export class AboutModule { }
