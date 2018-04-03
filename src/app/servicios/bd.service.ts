import { Injectable } from '@angular/core';
import { Producto } from '../producto/producto';
import {Usuario} from '../usuario/usuario';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from './upload';


@Injectable()
export class BdService {

  listaProductos: AngularFireList<any>;
  usuario: AngularFireList<any>;
  productos: Producto[];

  constructor(private fb: AngularFireDatabase) {
  }

  getProductos() {
    this.listaProductos = this.fb.list('productos');
    return this.listaProductos;
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
      productos: ['null']
    });
    return this.fb.list('usuarios', ref => ref.orderByChild('ident').equalTo(id))[0];
  }

  insertaProducto(producto: Producto, usuario: Usuario, arriba: Upload) {
    const w = usuario.$id;
    delete usuario.$id;
    let temporal = new Usuario();
    temporal = {
      $id: usuario.$id,
      productos: usuario.productos,
      nombre: usuario.nombre,
      email: usuario.email,
      ident: usuario.ident
    };
    delete temporal.productos;
    delete temporal.$id;
    const fecha = new Date();
    let z;
    if (arriba === null) {
      z = this.listaProductos.push({
        nombre: producto.nombre,
        fecha: fecha.toDateString(),
        imagenURL: '',
        usuario: temporal
      });
    }
    else {
      z = this.listaProductos.push({
        nombre: producto.nombre,
        fecha: fecha.toDateString(),
        imagenURL: arriba.url,
        usuario: temporal
      });
    }
    if ( usuario.productos[0] === 'null' ) {
      usuario.productos[0] = z.key;
    }
    else {
      let contador = 0;
      for ( let i = 0 ; usuario.productos[i] !== undefined ; i++ ) {
        contador++;
      }
      usuario.productos[contador] = z.key;
    }
    this.fb.list('usuarios').update(w, {productos: usuario.productos});
    return usuario;
  }


  eliminarProducto(producto: Producto, usuario: Usuario) {
    let aux: String[];
    aux = new Array();
    let z;
    for ( z = 0 ; usuario.productos[z] !== undefined ; z++ ) {
      aux[z] = usuario.productos[z];
    }
    if ( z === 1 ) {
      aux[0] = 'null';
    }
    else {
      for ( let i = 0 ; usuario.productos[i] !== undefined ; i++ ) {
        if ( producto.$id === usuario.productos[i] ) {
          aux.splice(i, 1);
          break;
        }
      }
    }
    this.fb.list('usuarios').update(usuario.$id, {productos: aux});
    this.fb.database.ref('productos/' + producto.$id).remove();
  }

  getPrimerosDiez() {
    this.listaProductos = this.fb.list('productos', ref => ref.limitToFirst(10));
    return this.listaProductos;
  }

  getUltimosDiez() {
    this.listaProductos = this.fb.list('productos', ref => ref.limitToLast(10));
    return this.listaProductos;
  }



}
