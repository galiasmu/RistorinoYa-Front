export interface IDisponibilidad {
  nroSucursal: number;
  codZona: number;
  nomZona: string;
  fecha: string;
  horaDesde: string;
  horaHasta: string;
  cantComensales: number;
  lugaresLibres: number;
  permiteMenores: boolean;
  disponible: boolean;
}
