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
  'latitud': number,
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

export type Request = {
  'id_solicitud': number; 
  'admin': Usuario;
  'solicitante': Usuario;
  'estado': string;
  'fecha_solicitud': string;
  'fecha_decision': string;
}

export type TagRequest = {
  'id_solicitud_etiqueta': number;
  'solicitud': Request;
  'etiqueta': string;
};

export type ResponseTagRequest = {
  'count': number;
  'data': TagRequest;
  'code': number;
  'message': string;
}

export type SupplierRequest = {
  'id_solicitud_proveedor': number;
  'solicitud': Request;
  'justificacion': string;
};

export type ResponseSupplierRequest = {
  'count': number;
  'data': SupplierRequest;
  'code': number;
  'message': string;
}

export type ServiceRequest = {
  'id_solicitud_servicio': number;
  'solicitud': Request;
  'cedula_j': string;
  'nombre': string;
  'descripcion': string;
  'latitud': number;
  'longitud': number;
  'ubicacion': string;
  'visible': boolean;
};

export type ResponseServiceRequest = {
  'count': number;
  'data': ServiceRequest;
  'code': number;
  'message': string;
}

export type DeleteServiceRequest = {
  'id_solicitud_eliminacion': number;
  'solicitud': Request;
  'servicio': ServiceRequest;
  'justificacion': string;
};

export type ResponseDeleteServiceRequest = {
  'count': number;
  'data': DeleteServiceRequest;
  'code': number;
  'message': string;
}

