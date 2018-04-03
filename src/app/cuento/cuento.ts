import {Usuario} from '../usuario/usuario';

export class Cuento {
  $id: string;
  cuerpo: string;
  fecha: Date;
  imagenURL?: string;
  usuario: Usuario;
  numFeliz: number;
  numTriste: number;
}
