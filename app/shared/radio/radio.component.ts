import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {RadioOption} from './radio-option.model'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms'

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() =>RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]
  
  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
  
    this.value = value
    //aviso as diretivas de que o valor do componente mudou
    this.onChange(this.value)
  }

  //metodo chamado para as diretivas quando elas querem passar um valor ao componente
  writeValue(obj: any): void{
    this.value = obj
  }

  //chamam a função sempre que o valor interno do componente mudar
  registerOnChange(fn: any): void{
    this.onChange = fn
  }
  
  //valida se o ususario entrou no componente
  registerOnTouched(fn: any): void{

  }
  
  setDisabledState?(isDisabled: boolean): void;

}
