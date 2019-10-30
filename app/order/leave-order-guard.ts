import { OrderComponent } from "./order.component";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";


export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
  canDeactivate(orderComponent: OrderComponent,
                activatedRoute: ActivatedRouteSnapshot,
                routerState: RouterStateSnapshot):boolean{
                  if(!orderComponent.isOrderCompleted()){
                    window.confirm('Finalize a compra para retornar')
                  }else{
                      return true
                  }
                }
}
