import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  //de padre a hijo
  //@Input({required: true}) img: string = '';
  //@Input({required: true}) price: number = 0;
  //@Input({required: true}) title: string = '';

  //objeto completo, referencia interface
  @Input ({required: true}) product!: Product;

  //de hijo a padre
  @Output() addToCart = new EventEmitter();

  addToCartHandler(){
    //console.log('click from child');
    //this.addToCart.emit('hola este es un msg desde el hijo' + this.title);
    //this.addToCart.emit('hola este es un msg desde el hijo' + this.product.title);
    this.addToCart.emit(this.product);
  }
}
