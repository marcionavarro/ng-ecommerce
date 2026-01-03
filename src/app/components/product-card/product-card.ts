import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatAnchor, MatIcon, RouterLink],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        [src]="product().imageUrl"
        alt="{{ product().name }}"
        class="w-full h-[300px] object-cover rounded-t-xl"
        [routerLink]="['/product', product().id]"
        [style.view-transition-name]="'product-image-' + product().id"
      />

      <ng-content />

      <div class="p-5 flex flex-col flex-1" [routerLink]="['/product', product().id]">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {{ product().description }}
        </p>

        <!-- add rating component -->

        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'Em estoque' : 'Sem estoque' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">{{
            product().price | currency : 'BRL' : 'symbol' : '1.2-2' : 'pt-BR'
          }}</span>
          <button
            matButton="filled"
            class="flex items-center gap-2"
            (click)="store.addToCart(product())"
          >
            <mat-icon>shopping_cart</mat-icon>
            Comprar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {
  product = input.required<Product>();

  addToCartClicked = output<Product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  toggleWishList(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishList(product);
    }
  }
}
