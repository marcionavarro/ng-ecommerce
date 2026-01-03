import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { CartItem } from './models/cart';
import { Order } from './models/order';
import { Product } from './models/product';
import { SignInParams, SignUpParams, User } from './models/user';
import { Toaster } from './services/toaster';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectProductId: string | undefined;
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
        name: 'Câmera Mirrorless Alpha M50',
        description: 'Câmera mirrorless com sensor APS-C, vídeo em 4K e lente incluída 15-45mm.',
        price: 4599.0,
        imageUrl: '/assets/imagens/products/camera.jpg',
        rating: 4.9,
        reviewCount: 34,
        inStock: false,
        category: 'Eletrônicos',
      },
      {
        id: '5',
        name: 'Conjunto de Panelas Inox Premium 10 peças',
        description:
          'Conjunto de panelas em inox com fundo triplo, tampas de vidro e utensílios incluídos.',
        price: 899.0,
        imageUrl: '/assets/imagens/products/panelas.jpg',
        rating: 4.5,
        reviewCount: 80,
        inStock: true,
        category: 'Casa',
      },
      {
        id: '6',
        name: 'Smart Home Speaker 360°',
        description:
          'Alto-falante inteligente com som em 360°, assistente virtual integrado e controle por voz.',
        price: 699.9,
        imageUrl: '/assets/imagens/products/smart-home.jpg',
        rating: 4.3,
        reviewCount: 45,
        inStock: true,
        category: 'Casa',
      },
      {
        id: '7',
        name: 'Aspirador Robot Cleaner Max',
        description: 'Aspirador de pó robô com mapeamento inteligente e recarga automática.',
        price: 1899.9,
        imageUrl: '/assets/imagens/products/aspirador-robo.jpg',
        rating: 4.7,
        reviewCount: 78,
        inStock: true,
        category: 'Casa',
      },
      {
        id: '8',
        name: 'Mesa Gamer 1,60m RGB',
        description:
          'Mesa para jogos com 1,60m de largura, iluminação RGB e porta‐copos integrado.',
        price: 1199.0,
        imageUrl: '/assets/imagens/products/mesa-gamer.png',
        rating: 4.2,
        reviewCount: 62,
        inStock: true,
        category: 'Casa',
      },
      {
        id: '9',
        name: 'Tênis Corrida UltraRun 3000',
        description:
          'Tênis de corrida ultra leve com amortecimento avançado e solado antiderrapante.',
        price: 399.99,
        imageUrl: '/assets/imagens/products/tenis.jpg',
        rating: 4.6,
        reviewCount: 185,
        inStock: true,
        category: 'Esporte',
      },
      {
        id: '10',
        name: 'Bicicleta SpeedRacer 700C',
        description:
          'Bicicleta de estrada com quadro de alumínio leve, 21 marchas e freio a disco.',
        price: 3499.0,
        imageUrl: '/assets/imagens/products/bicicleta.jpg',
        rating: 4.8,
        reviewCount: 97,
        inStock: true,
        category: 'Esporte',
      },
      {
        id: '11',
        name: 'Bola de Futebol Pro Grip',
        description:
          'Bola de futebol profissional com tecnologia antiabsorção e costura reforçada.',
        price: 199.9,
        imageUrl: '/assets/imagens/products/bola.jpg',
        rating: 4.4,
        reviewCount: 59,
        inStock: true,
        category: 'Esporte',
      },
      {
        id: '12',
        name: 'Raquete de Tênis Carbon X5',
        description:
          'Raquete de tênis em fibra de carbono leve, ideal para performance e controle.',
        price: 899.0,
        imageUrl: '/assets/imagens/products/raquete.jpg',
        rating: 4.7,
        reviewCount: 42,
        inStock: false,
        category: 'Esporte',
      },
      {
        id: '13',
        name: 'Lego City Polícia Aérea 60210',
        description: 'Conjunto Lego com helicóptero, carro e minifiguras de policiais e ladrões.',
        price: 449.9,
        imageUrl: '/assets/imagens/products/lego.jpg',
        rating: 4.8,
        reviewCount: 213,
        inStock: true,
        category: 'Brinquedos',
      },
      {
        id: '14',
        name: 'Boneca Interativa Sophia',
        description: 'Boneca com sensores de movimento, fala e 20 frases diferentes.',
        price: 299.9,
        imageUrl: '/assets/imagens/products/boneca.jpg',
        rating: 4.5,
        reviewCount: 88,
        inStock: true,
        category: 'Brinquedos',
      },
      {
        id: '15',
        name: 'Carrinho Controle Remoto TurboX',
        description: 'Carrinho de controle remoto com bateria recarregável e suspensão off-road.',
        price: 379.9,
        imageUrl: '/assets/imagens/products/carrinho.jpg',
        rating: 4.6,
        reviewCount: 120,
        inStock: true,
        category: 'Brinquedos',
      },
      {
        id: '16',
        name: 'Quebra-cabeça 1000 peças Paisagem Alpina',
        description: 'Quebra-cabeça de 1000 peças com imagem de montanhas e lagos.',
        price: 99.9,
        imageUrl: '/assets/imagens/products/quebra-cabeca.jpg',
        rating: 4.4,
        reviewCount: 54,
        inStock: true,
        category: 'Brinquedos',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectProductId: undefined,
  } as EcommerceState),
  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),
  withComputed(({ category, products, wishlistItems, cartItems, selectProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category.toLowerCase() === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === selectProductId())),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod((category: string) => {
        patchState(store, { category });
      }),

      setProductId: signalMethod((productId: string) => {
        patchState(store, { selectProductId: productId });
      }),

      addToWishList: (product: Product) => {
        const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updateWishlistItems });
        toaster.success('Produto Adicionado à lista de desejos');
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Produto Removido da lista de desejos');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      addToCart: (product: Product, quantity = 1) => {
        const existingItemindex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updateCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemindex !== -1) {
            draft[existingItemindex].quantity += quantity;
            return;
          }

          draft.push({
            product,
            quantity,
          });
        });

        patchState(store, { cartItems: updateCartItems });
        toaster.success(
          existingItemindex !== -1
            ? 'Produto adicionado novamente'
            : 'Produto adicionando ao carrinho'
        );
      },

      setItemQuantity: (params: { productId: string; quantity: number }) => {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      addAllWishListToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      moveToWishlist: (product: Product) => {
        const updateCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { cartItems: updateCartItems, wishlistItems: updateWishlistItems });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }

        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Por favor, faça login antes de finalizar o pedido.');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'Marcio Navarro',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'Marcio Navarro',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },
    })
  )
);
