import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import 'rxjs/add/operator/do'
@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  //ira representar o formulario
  orderForm: FormGroup

  delivery: number = 8

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderId: string

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]
  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.orderForm = this.formBuilder.group({
      //passar os componentes e dentro desse objeto e propriedades que representam os inputs do formulario
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern), Validators.minLength(5)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern), Validators.minLength(5)]),
      address:this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number:this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionAddress:this.formBuilder.control(''),
      paymentOption:this.formBuilder.control('', [Validators.required])
    }, {validators: OrderComponent.equalsEmails})
  }

  //validacao do campo de email estar igual ou nao a confirmação
  static equalsEmails(group: AbstractControl): {[key:string]: boolean}{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
      if(!email || !emailConfirmation){
        return undefined
      }
        if(email.value !== emailConfirmation.value){
          return{emailsNotMatch:true}
        }return undefined
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }

  //exposicao dos itens
  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  //aumentar quantidade
  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  //diminuir quantidade
  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  //remover item
  remove(item: CartItem){
    this.orderService.remove(item)
  }

  isOrderCompleted(): boolean{
    return this.orderId !== undefined
  }

  checkOrder(order: Order){

    //pegar a compra e adicionar os itens do carrinho
    //transformando um array de CartItens e transformando num array de orderItem
    //pegando estes itens e atribuindo ao objeto de compra
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    //metodo que recebe este objeto Order e mande para o servidor de backend
    this.orderService.checkOrder(order)
    .do((orderId: string)=>{
      this.orderId = orderId
    })
    .subscribe((orderId: string) => {
      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })
    console.log(order)
  }
}
