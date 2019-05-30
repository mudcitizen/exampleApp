import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { MessageModule } from "./messages/message.module";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component"
import {TermsGuard } from "./terms.guard";
import { OndemandComponent } from './ondemand/ondemand.component';

@NgModule({
  imports: [
    BrowserModule,ModelModule,CoreModule,MessageModule,routing
  ],
  declarations: [AppComponent, OndemandComponent],
  providers: [TermsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
