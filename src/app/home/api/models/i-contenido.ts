export interface IContenido {
  nroRestaurante: number;
  nroIdioma: number;
  nroContenido: number;
  nroSucursal: number | null;
  razonSocial: string;
  nomSucursal: string | null;
  contenidoPromocional: string;
  imagenPromocional: string | null;
  fechaIniVigencia: string;
  fechaFinVigencia: string;
  costoClick: number | null;
  codContenidoRestaurante: string;
}
