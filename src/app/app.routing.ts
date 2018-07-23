import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { DotsComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DotsComponent
  },
  {
  	path : 'login',
  	component : LoginComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {preloadingStrategy: PreloadAllModules });
