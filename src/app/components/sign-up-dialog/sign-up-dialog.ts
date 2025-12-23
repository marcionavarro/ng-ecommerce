import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 min-w-[480px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Inscrever-se</h2>
          <p class="text-sm text-gray-500">Junte-se a nós e comece a comprar hoje mesmo!</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="text" placeholder="Digite seu nome" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="email" matInput type="email" placeholder="Digite seu email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input
            formControlName="password"
            matInput
            type="password"
            placeholder="Digite sua senha"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input
            formControlName="confirmPassword"
            matInput
            type="password"
            placeholder="Confirme sua senha"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full" [disabled]="store.loading()">
          Criar Conta
        </button>
      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Já tem uma conta?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Entre aqui</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);
  store = inject(EcommerceStore);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group({
    name: ['Marcio Navarro', Validators.required],
    email: ['admin@email.com', Validators.required],
    password: ['admin123', Validators.required],
    confirmPassword: ['admin1234', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
