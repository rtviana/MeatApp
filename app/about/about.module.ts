import { NgModule } from "@angular/core";
import { AboutComponent } from "./about.component";
import { RouterModule, Routes} from '@angular/router'

//rotas
const ROUTES: Routes = [
    //caminho default
    {path:'', component: AboutComponent}
]
@NgModule({
    declarations:[AboutComponent],
    imports: [RouterModule, [RouterModule.forChild(ROUTES)]]
    })

export class AboutModule{
}