export type Brand = 'LU1' | 'NO1' | 'MA1';

export interface User {
  id: number;
  name: string;
  email: string;
  permisos: Permission[];
}

export interface Permission {
  funcion: 'ver' | 'editar' | 'administracion';
}

export interface Review {
  id: number;
  title: string;
  itemcode: string;
  estrellas: number;
  resena_descrip: string;
  fecha: string;
  visibilidad: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
}

export interface DashboardData {
  promedioPuntajes: ChartData;
  tasaDeRespuesta: ChartData;
  encuestasEnviadas: ChartData;
  numAVGEstrella: number;
  porcentaje: number;
}
