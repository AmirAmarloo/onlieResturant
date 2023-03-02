import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule  } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component'; 
import { RegisterComponent } from './components/user/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FoodsComponent } from './components/_crud/foods/foods.component';
import { IngredientComponent } from './components/_crud/ingredient/ingredient.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteFoodDialogComponent } from './components/_dialog/food/delete-food-dialog/delete-food-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PickListComponent } from './components/_dialog/food/food-pick-list/food-pick-list.component';
import { TakeawayStuffComponent } from './components/_crud/takeaway-stuff/takeaway-stuff.component';
import { DeleteTakeawaystuffDialogComponent } from './components/_dialog/takeaway-stuff/delete-takeawaystuff-dialog/delete-takeawaystuff-dialog.component';
import { DeleteOrderDialogComponent } from './components/_dialog/delete-order-dialog/delete-order-dialog.component';
import { AddFoodComponent } from './components/_dialog/food/add-food/add-food.component';
import { CustomerDataComponent } from './components/_dialog/customer-data/customer-data.component';
import { SubmitOrderComponent } from './components/_dialog/submit-order/submit-order.component';
import { PickTakewayStuffComponent } from './components/_dialog/takeaway-stuff/pick-takeway-stuff/pick-takeway-stuff.component';
import { OrderReadyComponent } from './components/changeStatus/order-ready/order-ready.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {A11yModule} from '@angular/cdk/a11y';
import { DeleteUserDialogComponent } from './components/_dialog/delete-user-dialog/delete-user-dialog.component';
import { OrderTakeawyComponent } from './components/order-takeawy/order-takeawy.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { InfoComponent } from './components/overlay/info/info.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    FoodsComponent,
    IngredientComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    DeleteFoodDialogComponent,
    PickListComponent,
    TakeawayStuffComponent,
    DeleteTakeawaystuffDialogComponent,
    DeleteOrderDialogComponent,
    AddFoodComponent,
    CustomerDataComponent,
    SubmitOrderComponent,
    PickTakewayStuffComponent,
    OrderReadyComponent,
    DeleteUserDialogComponent,
    OrderTakeawyComponent,
    OverlayComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    OverlayModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatSortModule,
    A11yModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
