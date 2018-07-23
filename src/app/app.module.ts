import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DotsComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ToolPanelComponent } from './ToolPanel/ToolPanel.component';
import { SidebarleftComponent } from './sidebarleft/sidebarleft.component';
import { SidebarrightComponent } from './sidebarright/sidebarright.component';

import { MessageService } from './message.service';
import {HttpModule} from '@angular/http';


@NgModule({
   declarations: [
      AppComponent,
      DotsComponent,
      HeaderComponent,
      ToolPanelComponent,
      LoginComponent,
      SidebarleftComponent,
      SidebarrightComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(AppRoutes, { useHash: false }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
