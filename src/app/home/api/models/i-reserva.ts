export interface IReservaRequest {
  nroRestaurante: number;
  nroSucursal: number;
  codZona: number;
  fecha: string;
  hora: string;
  cantAdultos: number;
  cantMenores: number;
}

export interface IReservaResponse {
  estado: string;
  motivo: string | null;
  nroReserva: number | null;
  codReservaSucursal: string | null;
  nroRestaurante: number;
  nroSucursal: number;
  codZona: number;
  fecha: string;
  hora: string;
  cantAdultos: number;
  cantMenores: number;
}

export interface IReservaCliente {
  nroReserva: number;
  codReservaSucursal: string;
  razonSocial: string;
  nomSucursal: string;
  calle: string;
  nroCalle: number;
  barrio: string;
  fechaReserva: string;
  horaReserva: string;
  codZona: number;
  zona: string;
  cantAdultos: number;
  cantMenores: number;
  codEstado: number;
  estado: string;
}
