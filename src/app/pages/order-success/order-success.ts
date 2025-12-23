import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatIcon, MatAnchor, RouterLink],
  template: `
    <div class="flex justify-center items-center h-[calc(100vh-64px)] py-6">
      <div
        class="flex flex-col items-center justify-center text-center bg-white rounded-xl shadow p-8 gap-6"
      >
        <mat-icon class="!text-green-500 !h-[56px] !w-[56px] !text[56px]">check_circle</mat-icon>
        <h2 class="font-semibold text-green-600 text-2xl font-bold">
          Pedido concluído com sucesso!
        </h2>
        <p class="text-base">
          Obrigado pela sua compra! Seu pedido foi confirmado e será enviado em breve.
        </p>
        <p class="text-gray-600">
          Você receberá em breve um e-mail de confirmação com os detalhes do seu pedido e
          informações de rastreamento.
        </p>
        <button matButton="filled" color="primary" class="w-full max-w-xs mt-2" routerLink="/">
          Continuar comprando
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {}
