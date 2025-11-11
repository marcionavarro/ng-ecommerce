import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    CommonModule,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categorias</h2>
          <mat-nav-list>
            @for(cat of categories(); track cat) {
            <mat-list-item
              [activated]="cat === category()"
              class="my-2"
              [routerLink]="['/products', cat]"
            >
              <span
                matListItemTitle
                class="font-medium"
                [class]="cat === category() ? '!text-white' : null"
                >{{ cat | titlecase }}</span
              >
            </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">{{ category() | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ filteredProducts().length }} produtos encontrados
        </p>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
          <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');

  products = signal<Product[]>([
    {
      id: '1',
      name: 'Fone de Ouvido Bluetooth X200',
      description: 'Fone de ouvido sem fio com cancelamento de ruído e bateria de longa duração.',
      price: 499.9,
      imageUrl: '/assets/imagens/products/fone-x200.jpg',
      rating: 4.5,
      reviewCount: 124,
      inStock: true,
      category: 'Eletrônicos',
    },
    {
      id: '2',
      name: 'Smartwatch FitPro Z1',
      description: 'Relógio inteligente com monitoramento de saúde, GPS e resistência à água.',
      price: 799.0,
      imageUrl: '/assets/imagens/products/smartwatch-FitPro-Z1.jpg',
      rating: 4.3,
      reviewCount: 98,
      inStock: true,
      category: 'Wearables',
    },
    {
      id: '3',
      name: 'Cafeteira Expresso Deluxe',
      description:
        'Máquina de café expresso com moinho embutido e controle de temperatura preciso.',
      price: 1299.5,
      imageUrl: 'https://images.unsplash.com/photo‑1565958011703‑44f9829a3f41',
      rating: 4.8,
      reviewCount: 76,
      inStock: false,
      category: 'Eletrodomésticos',
    },
    {
      id: '4',
      name: 'Tênis Corrida UltraRun 3000',
      description:
        'Tênis de corrida ultra leve com amortecimento avançado e solado antiderrapante.',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo‑1587691591967‑2a09bf2a1f5c',
      rating: 4.6,
      reviewCount: 185,
      inStock: true,
      category: 'Esporte',
    },
    {
      id: '5',
      name: 'Mochila Viagem Explorer 45L',
      description:
        'Mochila de viagem com capacidade de 45 litros, compartimentos inteligentes e proteção para laptop.',
      price: 349.9,
      imageUrl: 'https://images.unsplash.com/photo‑1556905055‑8f358a216774',
      rating: 4.4,
      reviewCount: 53,
      inStock: true,
      category: 'Viagem',
    },
    {
      id: '6',
      name: 'Câmera Mirrorless Alpha M50',
      description: 'Câmera mirrorless com sensor APS‑C, vídeo em 4K e lente incluída 15‑45mm.',
      price: 4599.0,
      imageUrl: 'https://images.unsplash.com/photo‑1519183071298‑0e18dba6c1e6',
      rating: 4.9,
      reviewCount: 34,
      inStock: false,
      category: 'Fotografia',
    },
    {
      id: '7',
      name: 'Livro ‘Design de Interação – 3ª Edição’',
      description: 'Livro sobre design de interação e UX com estudo de casos atualizados.',
      price: 159.9,
      imageUrl: 'https://images.unsplash.com/photo‑1512820790803‑83ca734da794',
      rating: 4.7,
      reviewCount: 47,
      inStock: true,
      category: 'Livros',
    },
    {
      id: '8',
      name: 'Mesa Gamer 1,60m RGB',
      description: 'Mesa para jogos com 1,60m de largura, iluminação RGB e porta‐copos integrado.',
      price: 1199.0,
      imageUrl: 'https://images.unsplash.com/photo‑1574180045827‑ecf4c95c5a79',
      rating: 4.2,
      reviewCount: 62,
      inStock: true,
      category: 'Casa',
    },
    {
      id: '9',
      name: 'Smart TV QLED 55″ UHD',
      description:
        'Smart TV QLED de 55 polegadas, resolução 4K, Dolby Atmos e sistema inteligente integrado.',
      price: 2599.0,
      imageUrl: '/assets/imagens/products/smart-tv.jpg',
      rating: 4.6,
      reviewCount: 112,
      inStock: false,
      category: 'Eletrônicos',
    },
    {
      id: '10',
      name: 'Conjunto de Panelas Inox Premium 10 peças',
      description:
        'Conjunto de panelas em inox com fundo triplo, tampas de vidro e utensílios incluídos.',
      price: 899.0,
      imageUrl: 'https://images.unsplash.com/photo‑1572768735545‑62ec65a1ce47',
      rating: 4.5,
      reviewCount: 80,
      inStock: true,
      category: 'Casa',
    },
    {
      id: '11',
      name: 'Tablet Pro 11″ com Caneta Stylus',
      description:
        'Tablet de 11 polegadas com caneta stylus, display de alta resolução e armazenamento de 256GB.',
      price: 3299.0,
      imageUrl: '/assets/imagens/products/tablet-pro.jpg',
      rating: 4.4,
      reviewCount: 65,
      inStock: true,
      category: 'Eletrônicos',
    },
    {
      id: '12',
      name: 'Smart Home Speaker 360°',
      description:
        'Alto‑falante inteligente com som em 360°, assistente virtual integrado e controle por voz.',
      price: 699.9,
      imageUrl: 'https://images.unsplash.com/photo‑1519066557923‑6b7a7fb1ca86',
      rating: 4.3,
      reviewCount: 45,
      inStock: true,
      category: 'Casa',
    },
  ]);

  filteredProducts = computed(() => {
    if (this.category() === 'all') return this.products();
    return this.products().filter(
      (p) => p.category.toLowerCase() === this.category().toLowerCase()
    );
  });

  categories = signal<string[]>([
    'all',
    'eletrônicos',
    'wearables',
    'eletrodomésticos',
    'casa',
    'livros',
    'fotografia',
    'esporte',
  ]);
}
