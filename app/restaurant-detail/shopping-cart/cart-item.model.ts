import { MenuItem } from "../menu-item/menu-item.model";

export class CartItem{
    name: any;
    constructor(public menuItem: MenuItem,
                public quantity: number = 1){}

//metodo para totalizar
    value():number{
        //quantidade vezes o preco
        return this.menuItem.price * this.quantity
    }
}