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

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  marca: Brand;
  permisos: Permission[];
  fecha_creacion: string;
  fecha_modificacion?: string;
  estado: 'activo' | 'inactivo';
}

export interface HistorialUsuario {
  id: number;
  usuario_id: number;
  accion: string;
  fecha: string;
  usuario_modificador: string;
}

export interface Pregunta {
  id: number;
  texto: string;
  tipo: 'cerrada' | 'abierta' | 'checkbox';
  orden: number;
  opciones?: Opcion[];
}

export interface Opcion {
  id: number;
  pregunta_id: number;
  texto: string;
  orden: number;
}

export interface HelpTopic {
  id: string;
  titulo: string;
  descripcion: string;
  icono?: string;
  contenido?: string;
}
