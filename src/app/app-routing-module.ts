import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Register } from './Components/auth/register/register';
import { Login } from './Components/auth/login/login';
import { Admin } from './dashboard/admin/admin';
import { User } from './dashboard/user/user';

import { AuthGuard } from './guards/auth-guard';

import { ForgetPassword } from './Components/auth/forget-password/forget-password';
import { VerifyOtp } from './Components/auth/verify-otp/verify-otp';
import { ResetPassword } from './Components/auth/reset-password/reset-password';

import { ProductListComponent } from './Components/product-list-component/product-list-component';
import { EditProductComponent } from './Components/edit-product-component/edit-product-component';
import { AddProductComponent } from './Components/add-product-component/add-product-component';
import { CartComponent } from './Components/cart-component/cart-component';
import { Order } from './Components/order/order';
import { MyOrders } from './Components/my-orders/my-orders';
import { OrderDetails } from './order-details/order-details';
import { AdminOrders } from './Components/admin-orders/admin-orders';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth Routes
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'forgot-password', component: ForgetPassword },
  { path: 'verify-otp', component: VerifyOtp },
  { path: 'reset-password', component: ResetPassword },
  {path:'cart',component:CartComponent},
  {path:'order',component:Order ,canActivate : [AuthGuard]},
  {path:'orders',component:MyOrders,canActivate : [AuthGuard]},
  {path:'order-details/:id',component:OrderDetails,canActivate : [AuthGuard]},

  // ADMIN Protected Routes
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard],
 children: [
   { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'add-product', component: AddProductComponent },
      { path: 'products', component: ProductListComponent },
      {path: 'edit-product/:id', component: EditProductComponent},
      {path:'orders', component: AdminOrders}
     
  ]
  },

  // USER Protected Route
  { path: 'user', component: User, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
