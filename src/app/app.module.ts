import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { DotsComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToolPanelComponent } from './ToolPanel/ToolPanel.component';



@NgModule({
   declarations: [
      AppComponent,
      DotsComponent,
      HeaderComponent,
      ToolPanelComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(AppRoutes, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
