import {Usuario} from '../usuario/usuario';

export class Producto {
  $id: string;
  cuerpo: string;
  fecha: Date;
  imagenURL?: string;
  usuario: Usuario;
  numFeliz: number;
  numTriste: number;
}
