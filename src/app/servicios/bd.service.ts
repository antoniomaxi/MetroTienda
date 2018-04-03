import { Injectable } from '@angular/core';
import {Cuento} from '../cuento/cuento';
import {Usuario} from '../usuario/usuario';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Upload} from './upload';


@Injectable()
export class BdService {

  listaCuentos: AngularFireList<any>;
  usuario: AngularFireList<any>;
  cuentos: Cuento[];

  constructor( private fb: AngularFireDatabase) {
  }

  getCuentos() {
    this.listaCuentos = this.fb.list('cuentos');
    return this.listaCuentos;
  }

  getUsuario(id: string) {
    return this.fb.list('usuarios', ref => ref.orderByChild('ident').equalTo(id));
  }



  generarUsuario(user, id: string) {
    this.usuario = this.fb.list('usuarios');
    this.usuario.push({
      ident: user.uid,
      nombre: user.displayName,
      email: user.email,
      cuentos: ['null']
    });
    return this.fb.list('usuarios', ref => ref.orderByChild('ident').equalTo(id))[0];
  }

  insertaCuento(cuento: Cuento, usuario: Usuario, arriba: Upload) {
    const w = usuario.$id;
    delete usuario.$id;
    let temporal = new Usuario();
    temporal = {
      $id: usuario.$id,
      cuentos: usuario.cuentos,
      nombre: usuario.nombre,
      email: usuario.email,
      ident: usuario.ident
    };
    delete temporal.cuentos;
    delete temporal.$id;
    const fecha = new Date();
    let z;
    if (arriba === null) {
      z = this.listaCuentos.push({
        cuerpo: cuento.cuerpo,
        fecha: fecha.toDateString(),
        numFeliz: 0,
        numTriste: 0,
        imagenURL: '',
        usuario: temporal
      });
    }
    else {
      z = this.listaCuentos.push({
        cuerpo: cuento.cuerpo,
        fecha: fecha.toDateString(),
        numFeliz: 0,
        numTriste: 0,
        imagenURL: arriba.url,
        usuario: temporal
      });
    }
    if ( usuario.cuentos[0] === 'null' ) {
      usuario.cuentos[0] = z.key;
    }
    else {
      let contador = 0;
      for ( let i = 0 ; usuario.cuentos[i] !== undefined ; i++ ) {
        contador++;
      }
      usuario.cuentos[contador] = z.key;
    }
    this.fb.list('usuarios').update(w, {cuentos: usuario.cuentos});
    return usuario;
  }

  sumarFeliz(cuento) {
    this.fb.list('cuentos').update(cuento.$id, {numFeliz: (cuento.numFeliz + 1)});
  }

  eliminarCuento(cuento: Cuento, usuario: Usuario) {
    let aux: String[];
    aux = new Array();
    let z;
    for ( z = 0 ; usuario.cuentos[z] !== undefined ; z++ ) {
      aux[z] = usuario.cuentos[z];
    }
    if ( z === 1 ) {
      aux[0] = 'null';
    }
    else {
      for ( let i = 0 ; usuario.cuentos[i] !== undefined ; i++ ) {
        if ( cuento.$id === usuario.cuentos[i] ) {
          aux.splice(i, 1);
          break;
        }
      }
    }
    this.fb.list('usuarios').update(usuario.$id, {cuentos: aux});
    this.fb.database.ref('cuentos/' + cuento.$id).remove();
  }

  getPrimerosDiez() {
    this.listaCuentos = this.fb.list('cuentos', ref => ref.limitToFirst(10));
    return this.listaCuentos;
  }

  getUltimosDiez() {
    this.listaCuentos = this.fb.list('cuentos', ref => ref.limitToLast(10));
    return this.listaCuentos;
  }

  sumarTriste(cuento) {
    this.fb.list('cuentos').set(cuento.$id, {
      cuerpo: cuento.cuerpo,
      numTriste: (cuento.numTriste + 1),
      fecha: cuento.fecha,
      imagenURL: cuento.imagenURL,
      usuario: cuento.usuario,
      numFeliz: cuento.numFeliz
    });
  }

}
