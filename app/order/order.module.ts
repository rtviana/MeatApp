import {NgModule} from "@angular/core"
import {RouterModule, Routes} from '@angular/router'
import {OrderComponent} from './order.component'
import {DeliveryCostsComponent} from './delivery-costs/delivery-costs.component'
import { SharedModule } from "app/shared/input/shared.module";
import { OrderItemsComponent } from "./order-itens/order-items.component";
import { LeaveOrderGuard } from "./leave-order-guard";

const ROUTES: Routes = [
  {path:'', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
  declarations:[OrderComponent,OrderItemsComponent,DeliveryCostsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule {}
