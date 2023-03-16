import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { OrderReadyComponent } from './components/changeStatus/order-ready/order-ready.component';
import { FoodsComponent } from './components/_crud/foods/foods.component';
import { IngredientComponent } from './components/_crud/ingredient/ingredient.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { TakeawayStuffComponent } from './components/_crud/takeaway-stuff/takeaway-stuff.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserComponent } from './components/user/user.component';
import { OrderTakeawyComponent } from './components/changeStatus/order-takeawy/order-takeawy.component';
import { InfoComponent } from './components/overlay/info/info.component';
import { OrderSettellComponent } from './components/changeStatus/order-settell/order-settell.component';
import { PeriodicReportComponent } from './components/report/periodic-report/periodic-report.component';
import { TableDefinitionComponent } from './components/tableReservation/table-definition/table-definition.component';
import { ReservationDefinitionComponent } from './components/tableReservation/reservation-definition/reservation-definition.component';

const routes: Routes = [
  {
    path: 'foods',
    component: FoodsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'users',
    component: UserComponent, canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path: 'register',
    component: RegisterComponent, 
  },
  {
    path: 'ingredients',
    component: IngredientComponent, canActivate:[AuthGuard]
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent, 
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent, 
  },          
  {
    path: 'takeawaystuff',
    component: TakeawayStuffComponent, canActivate:[AuthGuard]
  },          
  {
    path: 'order',
    component: OrdersComponent, 
  },  
  {
    path: 'info',
    component: InfoComponent, 
  },          
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' },      
  {
    path: 'changeOrderToReady',
    component: OrderReadyComponent, canActivate:[AuthGuard]
  },          
  {
    path: 'changeOrderToTakeaway',
    component: OrderTakeawyComponent, canActivate:[AuthGuard]
  },          
  {
    path: 'settellOrder',
    component: OrderSettellComponent, canActivate:[AuthGuard]
  },          
  {
    path: 'detailReport',
    component: PeriodicReportComponent, canActivate:[AuthGuard]
  },          
  {
    path: 'defineTable',
    component: TableDefinitionComponent, canActivate:[AuthGuard]
  },          
  {
    path: 'defineReservation',
    component: ReservationDefinitionComponent, canActivate:[AuthGuard]
  },          

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [
    // {
    //   provide: ROUTES,
    //   useFactory: () => {
        


    //       routes.push({
    //         path: 'foods',
    //         component: FoodsComponent,
    //       });          
    //       routes.push({
    //         path: 'users',
    //         component: UserComponent,
    //       });
    //       routes.push({
    //         path: 'login',
    //         component: LoginComponent
    //       });
    //       routes.push({
    //         path: 'register',
    //         component: RegisterComponent
    //       });
    //       routes.push({
    //         path: 'ingredients',
    //         component: IngredientComponent
    //       });
    //       routes.push({
    //         path: 'resetpassword',
    //         component: ResetPasswordComponent
    //       });
    //       routes.push({
    //         path: 'changepassword',
    //         component: ChangePasswordComponent
    //       });          

    //     let result = [...routes];
    //     return result;
    //   },
      
    //   multi: true
    // }
  // ]  
})

export class AppRoutingModule { }
