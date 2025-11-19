import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge],
  template: `
    <div class="flex items-center gap-2">
      <button
        matIconButton
        routerLink="/whishlist"
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistItems().length === 0"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      <button
        matIconButton
        [matBadge]="store.cartCount()"
        [matBadgeHidden]="store.cartCount() === 0"
        routerLink="cart"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>Entrar</button>
      <button matButton="filled">Cadastrar</button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
