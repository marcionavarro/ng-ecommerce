import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatAnchor, MatIcon, MatIconButton],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <img
        [src]="product().imageUrl"
        alt="{{ product().name }}"
        class="w-full h-[300px] object-cover rounded-t-xl"
      />

      <ng-content />

      <div class="p-5 flex flex-col flex-1">
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
            (click)="addToCartClicked.emit(product())"
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
