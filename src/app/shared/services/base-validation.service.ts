import { Injectable } from '@angular/core';

@Injectable()
export class BaseValidationService {
  constructor() {}

  public getValidatorErrorMessageDefault(propertyName: string): string | null {
    switch (propertyName) {
      case 'required': {
        return 'Campo Obrigatório';
      }
      case 'minlength': {
        return 'Campo possui menos caracteres do que o limite aceito';
      }
      case 'maxlength': {
        return 'Campo excedeu o limite de caracteres';
      }
      case 'email': {
        return 'Email no formato inválido';
      }
      case 'lowerCase': {
        return 'Campo só permite letras minúsculas';
      }
      case 'userNameTaken': {
        return 'Usuário já cadastrado';
      }
      case 'userNamePassword': {
        return 'Nome de usuário e senha precisam ser diferentes';
      }
      case 'confirmPassword': {
        return 'Senhas são diferentes';
      }
      default: {
        return null;
      }
    }
  }
}
