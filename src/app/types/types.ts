import {coerceNumberProperty} from '@angular/cdk/coercion';

export type Usuario = {
  'idUsuario': number;
  'tipo': number;
  'cedula': string;
  'nombre': string;
  'telefono': string;
  'correo': string;
  'contra': string;
};

export type ResponseUsuario = {
  'count': number;
  'data': Usuario;
  'code': number;
  'message': string;
};

export type InputUsuario = {
  'tipo': number;
  'cedula': string;
  'nombre': string;
  'telefono': string;
  'correo': string;
  'contra': string;
};
