import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CommonModule],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Resumo do pedido</h2>
      <div class="space-y-3 text-lg pt-4">
        <div class="flex justify-between border-t">
          <span>Subtotal</span>
          <span>{{ subtotal() | currency : 'BRL' : 'symbol' : '1.2-2' : 'pt-BR' }}</span>
        </div>
        <div class="flex justify-between">
          <span>Taxa</span>
          <span>{{ tax() | currency : 'BRL' : 'symbol' : '1.2-2' : 'pt-BR' }}</span>
        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>Total</span>
          <span>{{ total() | currency : 'BRL' : 'symbol' : '1.2-2' : 'pt-BR' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    )
  );

  tax = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => Math.round(this.subtotal() - this.tax()));
}
