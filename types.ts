export interface RiderResult {
  puesto: number | string;
  dorsal: number | string;
  pais: string;
  nombre: string;
  equipo: string;
  tiempo?: string;
  velProm?: string;
  puntos?: number;
  dif?: string;
  categoria?: string;
}

export interface TeamResult {
  puesto: number;
  equipo: string;
  tiempo: string;
  dif?: string;
}

export type ClassificationType = 'rider' | 'team';

export interface ClassificationData {
  title: string;
  type: ClassificationType;
  headers: string[];
  data: (RiderResult | TeamResult)[];
}
