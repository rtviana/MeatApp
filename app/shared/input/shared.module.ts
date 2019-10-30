import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./input.component";
import { RadioComponent } from "../radio/radio.component";
import { RatingComponent } from "../rating/rating.component";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantService } from "app/restaurants/restaurants.service";
import { OrderService } from "app/order/order.service";
import { NotificationService } from "../messages/notification.service";
import { SnackbarComponent } from "../messages/snackbar/snackbar.component";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LeaveOrderGuard } from "app/order/leave-order-guard";
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from "app/security/auth.interceptor";

@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports:[CommonModule, FormsModule, ReactiveFormsModule],
    exports:[InputComponent, RadioComponent, RatingComponent,
             CommonModule, FormsModule, ReactiveFormsModule,
             SnackbarComponent
             ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [ShoppingCartService,
                    RestaurantService,
                    OrderService,
                    NotificationService,
                    LoginService,
                    LoggedInGuard,
                    LeaveOrderGuard,
                    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
      }
    }
  }
