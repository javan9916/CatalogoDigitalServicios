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
        servicios {
          id_servicio
          nombre
          cedula_j
        }
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
        latitud
        longitud
        radio
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
        latitud
        longitud
        radio
      }
      code
      message
    }
  }`;
}

export function deleteLocationQuery(id: number) {
  return `mutation eliminarLocalizacion{
    eliminarLocalizacion(id_localizacion: ${id}){
      count
      code
      message
      data{
        id_localizacion
        nombre
        geofence
        visible
      }
    }
  }`;
}

export function updateLocationQuery() {
  return `mutation modificarLocalizacion($Input: InputUpdateLocalizacion!){
    modificarLocalizacion(input: $Input){
      count
      code
      message
      data{
        id_localizacion
        nombre
        geofence
        visible
        latitud
        longitud
        radio
      }
    }
  }`;
}

export function getCreateRequestSupplier() {
  return `mutation CrearSolicitudProveedor($Input: InputSolicitudProveedor!) {
    crearSolicitudProveedor(input: $Input) {
      code
      message
    }
  }`;
}

export function getTagRequestsQuery(quantity: number, offset: number, estado: string) {
  if (estado == null) {
    return `query solicitudesEtiqueta{
      solicitudesEtiqueta(quantity: ${quantity} offset: ${offset} estado: ${estado}){
        count
        data{
          id_solicitud_etiqueta
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
          }
          etiqueta
        }
        code
        message
      }
    }`;
  } else {
    return `query solicitudesEtiqueta{
      solicitudesEtiqueta(quantity: ${quantity} offset: ${offset} estado: "${estado}"){
        count
        data{
          id_solicitud_etiqueta
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
          }
          etiqueta
        }
        code
        message
      }
    }`;
  }
}

export function resolveTagRequestQuery(id_request: number, id_admin: number, decision: boolean) {
  return `mutation {
    resolverSolicitudEtiqueta(id_admin: ${id_admin} id_solicitud: ${id_request} decision: ${decision}) {
      count
      code
      message
      data{
        id_solicitud_etiqueta
        solicitud{
          id_solicitud
          admin{
            id_usuario
            tipo
          }
          solicitante{
            id_usuario
            nombre
          }
          estado
        }
        etiqueta
      }
    }
  }`;
}

export function getSupplierRequestsQuery(quantity: number, offset: number, estado: string) {
  if (estado == null) {
    return `query solicitudesProveedor{
      solicitudesProveedor(quantity: ${quantity} offset: ${offset} estado: ${estado}){
        count
        data{
          id_solicitud_proveedor
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
            fecha_decision
          }
          justificacion
        }
        code
        message
      }
    }`;
  } else {
    return `query solicitudesProveedor{
      solicitudesProveedor(quantity: ${quantity} offset: ${offset} estado: "${estado}"){
        count
        data{
          id_solicitud_proveedor
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
            fecha_decision
          }
          justificacion
        }
        code
        message
      }
    }`;
  }
}

export function resolveSupplierRequestQuery(id_request: number, id_admin: number, decision: boolean) {
  return `mutation {
    resolverSolicitudProveedor(id_admin: ${id_admin} id_solicitud: ${id_request} decision: ${decision}) {
      count
      code
      message
      data{
        id_solicitud_proveedor
        solicitud{
          id_solicitud
          admin{
            id_usuario
            tipo
          }
          solicitante{
            id_usuario
            nombre
          }
          estado
        }
        justificacion
      }
    }
  }`;
}

export function getServiceRequestsQuery(quantity: number, offset: number, estado: string) {
  if (estado == null) {
    return `query solicitudesServicio{
      solicitudesServicio(quantity: ${quantity} offset: ${offset} estado: ${estado}){
        count
        data{
          id_solicitud_servicio
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
            fecha_decision
          }
          cedula_j
          nombre
          descripcion
          latitud
          longitud
          ubicacion
          visible
        }
        code
        message
      }
    }`;
  } else {
    return `query solicitudesServicio{
      solicitudesServicio(quantity: ${quantity} offset: ${offset} estado: "${estado}"){
        count
        data{
          id_solicitud_servicio
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
            fecha_decision
          }
          cedula_j
          nombre
          descripcion
          latitud
          longitud
          ubicacion
          visible
        }
        code
        message
      }
    }`;
  }
}

export function resolveServiceRequestQuery(id_request: number, id_admin: number, decision: boolean) {
  return `mutation {
    resolverSolicitudServicio(id_admin: ${id_admin} id_solicitud: ${id_request} decision: ${decision}) {
      count
      data{
        id_solicitud_servicio
        solicitud{
          id_solicitud
          admin{
            id_usuario
            tipo
          }
          solicitante{
            id_usuario
            nombre
          }
          estado
        }
        cedula_j
        nombre
        descripcion
        latitud
        longitud
        ubicacion
        visible
      }
      code
      message
    }
  }`;
}

export function getDeleteServiceRequestsQuery(quantity: number, offset: number, estado: string) {
  if (estado == null) {
    return `query solicitudesEliminacionServicio{
      solicitudesEliminacionServicio(quantity: ${quantity} offset: ${offset} estado: ${estado}){
        count
        data{
          id_solicitud_eliminacion
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
            fecha_decision
          }
          servicio {
            id_servicio
          }
          justificacion
        }
        code
        message
      }
    }`;
  } else {
    return `query solicitudesEliminacionServicio{
      solicitudesEliminacionServicio(quantity: ${quantity} offset: ${offset} estado: "${estado}"){
        count
        data{
          id_solicitud_eliminacion
          solicitud{
            id_solicitud
            admin{
              id_usuario
              nombre
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
            fecha_solicitud
            fecha_decision
          }
          servicio {
            id_servicio
          }
          justificacion
        }
        code
        message
      }
    }`;
  }
}

export function resolveDeleteServiceRequestQuery(id_request: number, id_admin: number, decision: boolean) {
  return `mutation {
    resolverSolicitudEliminacionServicio(id_admin: ${id_admin} id_solicitud: ${id_request} decision: ${decision}) {
      count
        data{
          id_solicitud_eliminacion
          solicitud{
            id_solicitud
            admin{
              id_usuario
              tipo
            }
            solicitante{
              id_usuario
              nombre
            }
            estado
          }
          servicio {
            id_servicio
          }
          justificacion
        }
        code
        message
    }
  }`;
}

export function getCreateRequestTag() {
  return `mutation CrearSolicitudEtiqueta($Input:InputSolicitudEtiqueta!) {
    crearSolicitudEtiqueta(input:$Input) {
      code
      message
    }
  }`;
}

export function getCreateRequestService() {
  return `mutation CrearSolicitudServicio($Input:InputSolicitudSrevicio!) {
    crearSolicitudServicio(input:$Input) {
      code
      message
    }
  }`;
}

export function getDeleteRequestService() {
  return `mutation CrearSolicitudEliminacionServicio($Input: InputSolicitudEliminacionServicio!) {
    crearSolicitudEliminacionServicio(input:$Input){
      code
      message
    }
  }`;
}

export function getTagQuery() {
  return `mutation agregarEtiqueta($Input: InputEtiqueta!){
    agregarEtiqueta(input: $Input) {
      count
      data {
        nombre
      }
      code
      message
    }
  }`;
}

