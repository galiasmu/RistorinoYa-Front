export interface PromotionDTO {
  nroRestaurante: number;
  nroIdioma: number;
  nroContenido: number;
  nroSucursal: number;
  contenidoPromocional: string;
  imagenPromocional: string;
  contenidoAPublicar: string;
  fechaIniVigencia: string;
  fechaFinVigencia: string;
  costoClick: number | null;
  codContenidoRestaurante: string;
  razonSocial: string;
  nomIdioma: string;
  nomSucursal: string;
}
