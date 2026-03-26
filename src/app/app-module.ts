import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './Components/auth/login/login';
import { Register } from './Components/auth/register/register';
import { User } from './dashboard/user/user';
import { Admin } from './dashboard/admin/admin';

import { TokenInterceptor } from './token-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPassword } from './Components/auth/forget-password/forget-password';
import { VerifyOtp } from './Components/auth/verify-otp/verify-otp';
import { ResetPassword } from './Components/auth/reset-password/reset-password';
import { AddProductComponent } from './Components/add-product-component/add-product-component';
import { ProductListComponent } from './Components/product-list-component/product-list-component';
import { EditProductComponent } from './Components/edit-product-component/edit-product-component';
import { CartComponent } from './Components/cart-component/cart-component';
import { Order } from './Components/order/order';
import { MyOrders } from './Components/my-orders/my-orders';
import { OrderDetails } from './order-details/order-details';






@NgModule({
  declarations: [
    App,
    Login,
    Register,
    User,
    Admin,
    ForgetPassword,
    VerifyOtp,
    ResetPassword,
    AddProductComponent,
    ProductListComponent,
    EditProductComponent,
    CartComponent,
    Order,
    MyOrders,
    OrderDetails
    

   

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    provideBrowserGlobalErrorListeners(),

    // ✅ Correct place for TokenInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

  bootstrap: [App]
})
export class AppModule { }
