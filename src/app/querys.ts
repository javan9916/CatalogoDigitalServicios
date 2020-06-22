import {InputUsuario} from './types/types';

export function getLoginQuery(correoUsuario: string, passwordUsuario: string) {
  return `query {
    login(correo: "${correoUsuario}" password: "${passwordUsuario}") {
      count
      code
      message
      data {
        id_usuario
        tipo
        cedula
        nombre
        telefono
        correo
      }
    }
  }`;
}

export function getSignupQuery() {
  return `mutation registrarUsuario($Input: InputUsuario!){
    registrarUsuario(input: $Input) {
      count
      code
      message
      data {
        id_usuario
        tipo
        cedula
        nombre
        telefono
        correo
      }
    }
  }`;
}

