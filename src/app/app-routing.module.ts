import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' , canActivate: [AuthGuard] },
  { path: 'tab4', loadChildren: './pages/tab4/tab4.module#Tab4PageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'info-modal', loadChildren: './component/info-modal/info-modal.module#InfoModalPageModule' },
  { path: 'search-modal', loadChildren: './component/search-modal/search-modal.module#SearchModalPageModule' },
  { path: 'service-status', loadChildren: './pages/service-status/service-status.module#ServiceStatusPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
