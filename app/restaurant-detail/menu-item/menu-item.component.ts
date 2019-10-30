import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MenuItem} from './menu-item.model'
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared',[
      state('ready', style({opacity: 1})),
        transition('void => ready',[
          style({opacity: 0, transform: 'translateY(-20px)'}),
            animate('750ms 0s ease-in')
    ])
  ])
  ]
  
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'
  
@Input() menuItem: MenuItem
@Output() add = new EventEmitter()//emitir o evento
  
  //propriedade que representa um item do menu
  constructor() { }

    ngOnInit() {
  }

  emitAddEvent(){
    this.add.emit(this.menuItem)//quando eu emito um evento dizendo que aquele menu foi clicado, meu componente parent podera associar uma acao e fazer algo pra mim
  }

}