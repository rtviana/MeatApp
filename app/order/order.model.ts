class Order{
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public id?: string
    ){}

}

class OrderItem{
    
    //enviando para o backend a quantidade do item e sua identificacao
    constructor(public quantity: any, public menuId: string){}
    }
export {Order, OrderItem}