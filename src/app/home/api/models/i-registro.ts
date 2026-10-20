export interface IPreferenciaCliente {
  codCategoria: number;
  nroValorDominio: number;
}

export interface IRegistro {
  apellido: string;
  nombre: string;
  correo: string;
  clave: string;
  confirmacionClave: string;
  telefonos: string;
  nroLocalidad: number;
  preferencias: IPreferenciaCliente[];
}

export interface IRegistroResponse {
  nroCliente: number | null;
  estado: string;
  motivo: string | null;
}
