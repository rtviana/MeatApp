//classe de servico, que acessa o back-end
import{Injectable} from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import{Restaurant} from './restaurant/restaurant.model'
import{Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {MenuItem} from 'app/restaurant-detail/menu-item/menu-item.model';
import{MEAT_API} from '../app.api'

@Injectable()
export class RestaurantService {

  constructor(private http: HttpClient){}

  //metodo que vai retornar um array de restaurante
  //um metodo que representa meus dados
  restaurants(search?: string):Observable<Restaurant[]>{
    //acesso aos restaurantes
    //retorna um observable
    //a resposta precisa ser mapeada, pq recebera um objeto response

    let params: HttpParams = undefined

    if(search){
      //intanciando objeto http
      params = new HttpParams().append('q', search)
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})//captura da busca com Json Server, pois suporta queries, o q busca em todos os dados do bd restaurante
  }

  //metodo que retorna um restaurant por id
  restaurantById(id: string): Observable<Restaurant>{
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  //trazendo os reviews dos restaurantes
  reviewsOfRestaurant(id: string): Observable<any>{
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]>{
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }
}
