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
          visible
          descripcion
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

export function getAllLocationsQuery(quantity: number, offset: number) {
  return `query {
    localizaciones (quantity: ${quantity} offset: ${offset}){
      count
      data {
        id_localizacion
        nombre
        latitud
        longitud
        radio
        visible
        catalogo {
          id_servicio
          cedula_j
          nombre
          descripcion
          latitud
          longitud
          etiquetas {
            id_etiqueta
            nombre
          }
          encargados {
            id_usuario
            nombre
          }
        }
      }
      code
      message
    }
  }`;
}

export function getLocationsQuery(quantity: number, offset: number, visible: boolean) {
  return `query {
    localizaciones (quantity: ${quantity} offset: ${offset} visible: ${visible}){
      count
      data {
        id_localizacion
        nombre
        latitud
        longitud
        radio
        visible
        catalogo {
          id_servicio
          cedula_j
          nombre
          descripcion
          latitud
          longitud
          etiquetas {
            id_etiqueta
            nombre
          }
          encargados {
            id_usuario
            nombre
          }
        }
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

export function getTags(quantity: number, offset: number) {
  return `query etiquetas {
    etiquetas(quantity: ${quantity} offset: ${offset}){
      count
      data {
        id_etiqueta
        nombre
      }
      code
      message
    }
  }`
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

export function getTagUpdateQuery() {
  return `mutation modificarEtiqueta($Input: InputUpdateEtiqueta!){
    modificarEtiqueta(input: $Input) {
      count
      data {
        id_etiqueta
        nombre
      }
      code
      message
    }
  }`;
}

export function getTagDeleteQuery(id: number) {
  return `mutation {
    eliminarEtiqueta(id_etiqueta: ${id}) {
      count
      data {
        id_etiqueta
        nombre
      }
      code
      message
    }
  }`;
}

export function modifyServiceQuery() {
  return `mutation ModificarServicio($Input: InputUpdateServicio!) {
    modificarServicio(input: $Input) {
      code
      message
    }
  }`
}

export function getServices() {
  return `query Servicios($Quantity:Int! $Offset:Int! $Encargado:Int $Nombre:String $Visible:Boolean) {
    servicios(quantity:$Quantity offset:$Offset id_encargado:$Encargado nombre:$Nombre visible:$Visible) {
      code
      message
      data {
        id_servicio
        cedula_j
        nombre
        descripcion
        latitud
        longitud
        ubicacion
        visible
        encargados {
          id_usuario
          nombre
        }
        etiquetas {
          id_etiqueta
          nombre
        }
      }
    }
  }`
}

export function getServicesByTags(quantity: number, offset: number, etiquetas: any) {
  return `query {
    servicios (quantity: ${quantity} offset: ${offset} etiquetas: [${etiquetas}]) {
      count
      data{
        id_servicio
        nombre
        cedula_j
        localizacion {
          id_localizacion
          nombre
        }
        latitud
        longitud
        ubicacion
        encargados {
          id_usuario
          nombre
        }
        etiquetas {
          id_etiqueta
          nombre
        }
      }
      code
      message
    }
  }`
}

export function getServicesByLocation(quantity: number, offset: number, latitud: number, longitud: number, radio: number) {
  return `query {
    servicios (quantity: ${quantity} offset: ${offset} latitud: ${latitud} longitud: ${longitud} radio: ${radio}) {
      count
      data{
        id_servicio
        nombre
        cedula_j
        localizacion {
          id_localizacion
          nombre
        }
        latitud
        longitud
        ubicacion
        encargados {
          id_usuario
          nombre
        }
        etiquetas {
          id_etiqueta
          nombre
        }
      }
      code
      message
    }
  }`
}

export function getAllServices(quantity: number, offset: number) {
  return `query {
    servicios (quantity: ${quantity} offset: ${offset}) {
      count
      data{
        id_servicio
        nombre
        cedula_j
        localizacion {
          id_localizacion
          nombre
        }
        latitud
        longitud
        ubicacion
        encargados {
          id_usuario
          nombre
        }
        etiquetas {
          id_etiqueta
          nombre
        }
      }
      code
      message
    }
  }`
}

export function getAllTags() {
  return `query Etiquetas($Quantity:Int! $Offset:Int! $Nombre:String) {
    etiquetas(quantity:$Quantity offset:$Offset nombre:$Nombre) {
      code
      message
      data {
        id_etiqueta
        nombre
      }
    }
  }`
}

export function modifyTag() {
  return `mutation ModificarEtiquetasServicio($Id_servicio:Int! $Etiquetas:[Int]! $Add:Boolean!) {
    modificarEtiquetasServicio(id_servicio:$Id_servicio etiquetas:$Etiquetas add:$Add) {
      code
      message
      data {
        etiquetas {
          id_etiqueta
          nombre
        }
      }
    }
  }`
}

export function getLocationServices(quantity: number, offset: number, id_localizacion: number) {
  return `query {
    servicios (quantity: ${quantity} offset: ${offset} id_localizacion: ${id_localizacion}){
      count
      data{
        id_servicio
        nombre
        cedula_j
        localizacion {
          id_localizacion
          nombre
        }
        latitud
        longitud
        encargados {
          id_usuario
          nombre
          cedula
        }
        etiquetas {
          id_etiqueta
          nombre
        }
      }
      code
      message
    }
  }`
}

export function getSupplierServices(quantity: number, offset: number, id_encargado: number) {
  return `query {
    servicios (quantity: ${quantity} offset: ${offset} id_encargado: ${id_encargado}){
      count
      data{
        id_servicio
        nombre
        cedula_j
      }
      code
      message
    }
  }`
}

export function getUsersByType(quantity: number, offset: number, tipo: number) {
  return `query usuarios {
    usuarios (quantity: ${quantity} offset: ${offset} tipo: ${tipo}){
      count
      data {
        nombre
        id_usuario
        telefono
        correo
        cedula
      }
      code
      message
    }
  }`
}

export function updateServiceSupplier(id_servicio: number, id_encargado: number, add: boolean) {
  return `mutation {
    modificarEncargadoServicio (id_servicio: ${id_servicio} id_encargado: ${id_encargado} add: ${add}){
      count
      data {
        id_servicio
        nombre
        cedula_j
      }
      code
      message
    }
  }`
}

export function getDeleteUser() {
  return `mutation EliminarUsuario($ID:Int!) {
    eliminarUsuario(id_usuario: $ID){
      code
      message
    }
  }`
}

export function getUpdateUser() {
  return `mutation ModificarUsuario($Input:InputUpdateUsuario !) {
    modificarUsuario(input:$Input){
      code
      message
    }
  }`
}


