import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
    data: { breadcrumb: 'Shop' },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((m) => m.BasketModule),
    data: { breadcrumb: 'Basket' },
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
    data: { breadcrumb: 'Checkout' },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
