import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../restaurants/restaurants.service'
import {ActivatedRoute} from '@angular/router'
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';


@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant
  //puxar o servico (injetar)
  constructor(private restaurantsService: RestaurantService,
              private route: ActivatedRoute) { }

  //na inicializacao do componente, faremos a consulta baseado no ID
  ngOnInit() {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id'])
    .subscribe(restaurant => this.restaurant = restaurant)    
  }
}
