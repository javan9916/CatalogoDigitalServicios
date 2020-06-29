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

export type Localizacion = {
  'idLocalizacion': number,
  'nombre': string,
  'geofence': string,
  'visible': boolean,
  'latitud ': number,
  'longitud': number,
  'radio': number
};

export type ResponseLocalizacion = {
  'count': number;
  'data': Localizacion;
  'code': number;
  'message': string;
};

export type InputLocalizacion = {
  'nombre': string,
  'latitud': number,
  'longitud': number,
  'radio': number,
  'visible': boolean
};

export type InputUpdateLocalizacion = {
  'id_localizacion': number,
  'nombre': string,
  'latitud': number,
  'longitud': number,
  'radio': number,
  'visible': boolean
};

