import {Usuario} from '../usuario/usuario';

export class Producto {
  $id: string;
  nombre: string;
  fecha: Date;
  imagenURL?: string;
  usuario: Usuario;
}
