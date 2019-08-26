import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' , canActivate: [AuthGuard] },
  { path: 'transactions', loadChildren: './pages/transactions/transactions.module#TransactionsPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'search-modal', loadChildren: './component/search-modal/search-modal.module#SearchModalPageModule' },
  { path: 'search-modal', loadChildren: './component/search-modal/search-modal.module#SearchModalPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
