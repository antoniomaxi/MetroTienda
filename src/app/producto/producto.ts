import {Usuario} from '../usuario/usuario';

export class Producto {
  $id: string;
  nombre: string;
  precio: number;
  fecha: Date;
  imagenURL?: string;
  usuario: Usuario;
}
