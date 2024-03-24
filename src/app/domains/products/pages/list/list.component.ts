import { Component, signal, inject, Input, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';

import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-list',
	standalone: true,
	imports: [RouterLink, ProductComponent, HeaderComponent],
	templateUrl: './list.component.html',
	styleUrl: './list.component.css',
})
export default class ListComponent {
	products = signal<Product[]>([]);
	categories = signal<Category[]>([]);
	//cart = signal<Product[]>([]);
	private cartService = inject(CartService);
	private productService = inject(ProductService);
	private categoryService = inject(CategoryService);
	@Input() category_id?: string;

	ngOnInit(){
		//this.getProducts();
		this.getCategories();
	}

	ngOnChanges(changes: SimpleChanges){
		//console.log(this.category_id);
		/*const category_id = changes['category_id'];
		if(category_id){
			this.getProducts();
		}*/
		this.getProducts();
	}

	/*constructor() {
		const initProducts: Product[] = [
			{
				id: Date.now(),
				title: 'Prod 1',
				price: 100,
				image: 'https://picsum.photos/640/640?r=10',
				creationAt: new Date().toISOString()
			},
			{
				id: Date.now(),
				title: 'Prod 2',
				price: 100,
				image: 'https://picsum.photos/640/640?r=11',
				creationAt: new Date().toISOString()
			},
			{
				id: Date.now(),
				title: 'Prod 3',
				price: 100,
				image: 'https://picsum.photos/640/640?r=12',
				creationAt: new Date().toISOString()
			},
			{
				id: Date.now(),
				title: 'Prod 4',
				price: 100,
				image: 'https://picsum.photos/640/640?r=13',
				creationAt: new Date().toISOString()
			},
			{
				id: Date.now(),
				title: 'Prod 5',
				price: 100,
				image: 'https://picsum.photos/640/640?r=14',
				creationAt: new Date().toISOString()
			},
			{
				id: Date.now(),
				title: 'Prod 6',
				price: 100,
				image: 'https://picsum.photos/640/640?r=15',
				creationAt: new Date().toISOString()
			}
		];
		this.products.set(initProducts);
	}*/

	addToCart(product: Product) {
		//console.log('estamos en el padre');
		//console.log(event);
		//this.cart.update(prevState => [...prevState, product]);
		this.cartService.addToCart(product);
	}

	private getProducts(){
		this.productService.getProducts(this.category_id)
		.subscribe({
			next: (products) => {
				this.products.set(products);
			},
			error: () => {

			}
		});
	}

	private getCategories(){
		this.categoryService.getAll()
		.subscribe({
			next: (data) => {
				this.categories.set(data);
			},
			error: () => {

			}
		});
	}
}
