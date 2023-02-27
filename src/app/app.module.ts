import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieFormComponent } from './forms/movie-form/movie-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule  } from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import { InitparamComponent } from './initparam/initparam.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { FoodsComponent } from './foods/foods.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteFoodDialogComponent } from './_dialog/delete-food-dialog/delete-food-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CourseDialogComponent } from './_dialog/course-dialog/course-dialog.component';
import { PickListComponent } from './_dialog/pick-list/pick-list.component';
import { TakeawayStuffComponent } from './takeaway-stuff/takeaway-stuff.component';
import { DeleteTakeawaystuffDialogComponent } from './_dialog/delete-takeawaystuff-dialog/delete-takeawaystuff-dialog.component';
import { DeleteOrderDialogComponent } from './_dialog/delete-order-dialog/delete-order-dialog.component';
import { AddFoodComponent } from './_dialog/add-food/add-food.component';
import { CostomerDataComponent } from './_dialog/costomer-data/costomer-data.component';
import { SubmitOrderComponent } from './_dialog/submit-order/submit-order.component';
import { PickTakewayStuffComponent } from './_dialog/pick-takeway-stuff/pick-takeway-stuff.component';
import { OrderReadyComponent } from './ChangeStatus/order-ready/order-ready.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {A11yModule} from '@angular/cdk/a11y';
import { DeleteUserDialogComponent } from './_dialog/delete-user-dialog/delete-user-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    MovieFormComponent,
    InitparamComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    FoodsComponent,
    IngredientComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    DeleteFoodDialogComponent,
    CourseDialogComponent,
    PickListComponent,
    TakeawayStuffComponent,
    DeleteTakeawaystuffDialogComponent,
    DeleteOrderDialogComponent,
    AddFoodComponent,
    CostomerDataComponent,
    SubmitOrderComponent,
    PickTakewayStuffComponent,
    OrderReadyComponent,
    DeleteUserDialogComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
