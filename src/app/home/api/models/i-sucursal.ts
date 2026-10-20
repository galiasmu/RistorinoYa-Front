export interface ISucursal {
  nroRestaurante: number;
  razonSocial: string;
  nroSucursal: number;
  nomSucursal: string;
  calle: string;
  nroCalle: number;
  barrio: string;
  nomLocalidad: string;
  codPostal: string;
  telefonos: string;
  totalComensales: number;
  minTolerenciaReserva: number;
  zonas: string;
  preferencias: string;
}

export interface ITurno {
  hora_desde: string;
  hora_hasta: string;
  permite_menores: boolean;
}

export interface IZona {
  cod_zona: number;
  zona: string;
  cant_comensales: number;
  permite_menores: boolean;
  turnos: ITurno[];
}

export interface IPreferenciaSucursal {
  categoria: string;
  valor_dominio: string;
}
