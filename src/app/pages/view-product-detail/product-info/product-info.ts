import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { EcommerceStore } from '../../../ecommerce-store';
import { Product } from '../../../models/product';
import { StockStatus } from '../stock-status/stock-status';

@Component({
  selector: 'app-product-info',
  imports: [
    CommonModule,
    TitleCasePipe,
    StockStatus,
    QtySelector,
    MatAnchor,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
  ],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>
    <h1 class="text-2xl font-extrabold mb-3">{{ product().name }}</h1>
    <p class="text-3xl font-extrabold mb-4">
      {{ product().price | currency : 'BRL' : 'symbol' : '1.2-2' : 'pt-BR' }}
    </p>
    <app-stock-status class="mb-4" [inStock]="product().inStock" />
    <p class="font-semibold mb-2">Descrição</p>
    <p class="text-gray-600 border-b border-gray-200 pb-4">{{ product().description }}</p>
    <div class="flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold">Quantidade:</span>
      <app-qty-selector [quantity]="quantity()" (qtyUpdated)="quantity.set($event)" />
    </div>
    <div class="flex items-center gap-4 mb border-b border-gray-200 pb-4">
      <button
        matButton="filled"
        class="w-2/3 flex items-center gap-2"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>
        {{ product().inStock ? 'Adicionar ao carrinho' : 'Sem estoque' }}
      </button>
      <app-toggle-wishlist-button
        class="w-10 h-10 rounded-md !bg-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
        [product]="product()"
      />
      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>
    </div>
    <div class="pt-6 flex flex-col gap-2 text-gray-700 text-xs">
      <div class="flex items-center gap-3">
        <mat-icon class="small">local_shipping</mat-icon>
        <span>Frete grátis para pedidos acima de R$ 50</span>
      </div>
      <div class="flex items-center gap-3">
        <mat-icon class="small">autorenew</mat-icon>
        <span>Política de devolução de 30 dias</span>
      </div>
      <div class="flex items-center gap-3">
        <mat-icon class="small">shield</mat-icon>
        <span>Garantia de 2 anos incluída</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  product = input.required<Product>();
  store = inject(EcommerceStore);
  quantity = signal(1);
}
