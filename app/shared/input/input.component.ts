import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName, FormControlDirective, } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit, AfterContentInit {

  //poderao ser informadas de fora
  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip: boolean = true

  //objeto que sera usado como referencia
  input: any

  //o angular sera capaz de injetar uma referencia numa diretiva
  //referencia que sera pegada
  @ContentChild(FormControlName) control: FormControlName
  @ContentChild(NgModel) model: NgModel

  constructor() {}

  ngOnInit() {
  }

  //metodo que sera chamado extamente quando o conteudo for definido
  ngAfterContentInit(){

    //vamos tentar pegar umas das duas diretivas
    //se ng model nao estiver disponivel, usar form control
    this.input = this.control || this.control
    //vamos checar se o conteudo existe com a tag ngModel
      if(this.input === undefined){
      throw new Error('Utilizar diretiva NgModel ou FormControlName')
    }

  }

  hasSuccess(): Boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): Boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }
}
