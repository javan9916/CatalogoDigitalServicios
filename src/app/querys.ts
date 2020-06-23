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

export function getLocationQuery() {
  return `mutation agregarLocalizacion($Input: InputLocalizacion!){
    agregarLocalizacion(input: $Input) {
      count
      data {
        id_localizacion
        nombre
        geofence
        visible
      }
      code
      message
    }
  }`;
}

export function getLocationsQuery(quantity: number, offset: number) {
  return `query localizaciones{
    localizaciones(quantity: ${quantity} offset: ${offset}){
      count
      data{
        id_localizacion
        nombre
        geofence
        visible
      }
      code
      message
    }
  }`;
}

