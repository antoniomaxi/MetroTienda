import {Producto} from './producto';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BdService} from '../servicios/bd.service';
import {Usuario} from '../usuario/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Upload} from '../servicios/upload';
import {UploadService} from '../servicios/upload.service';
import {Router} from '@angular/router';
import {isNull} from "util";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [BdService, AngularFireAuth]
})
export class ProductoComponent implements OnInit {

  productos: Producto[];
  usuarios: Usuario[];
  enviar: Producto;
  usuario: Usuario;
  borrar: boolean;

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private BD: BdService, private afAuth: AngularFireAuth, private arriba: UploadService) {
    this.borrar = false;
  }

  anadirProducto(form: NgForm) {
    this.enviar = new Producto();
    if (form.value.nombre !== undefined) {
      if (form.value.nombre.length > 0 && form.value.nombre.length < 1000) {
        if ( this.currentUpload === null ) {
          this.usuario = this.BD.insertaProducto(form.value, this.usuario, null);
        }
        else {
          this.usuario = this.BD.insertaProducto(form.value, this.usuario, this.currentUpload);
          this.currentUpload = null;
          this.selectedFiles = null;
        }
      }
      else {
        console.log('Número de caracteres inválido');
      }
    }
  }

  todos() {
    let x = this.BD.getProductos();
    x.snapshotChanges().subscribe(item =>{
      this.productos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.productos.push(y as Producto);
      });
    });
  }

  eliminar(prod) {
    this.BD.eliminarProducto(prod, this.usuario);
    this.regresar();
  }

  detectarArchivo(event) {
    this.selectedFiles = event.target.files;
    let aux1 = event.target.files[0].name.substring(event.target.files[0].name.length - 3);
    let aux2 = event.target.files[0].name.substring(event.target.files[0].name.length - 3);
    if ( aux1 === 'jpg' || aux2 === 'jpeg' || aux1 === 'png' ) {
      this.subir();
    }
    else {
      this.selectedFiles = null;
      console.log('Formato de archivo inválido');
    }
  }

  verMisProductos() {
    this.borrar = true;
    if (this.usuario.productos !== undefined ) {
      let aux: Producto[];
      aux = new Array;
      for ( let i = 0 ; this.productos[i] !== undefined ; i++ ) {
        for ( let j = 0 ; this.usuario.productos[j] !== undefined ; j++ ) {
          if (this.productos[i].$id === (this.usuario.productos[j])) {
            aux.push(this.productos[i]);
          }
        }
      }
      this.productos = aux;
    }
    else {
      this.productos = null;
    }
  }

  subir() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.arriba.pushUpload(this.currentUpload);
  }

  regresar() {
    this.borrar = false;
    this.enviar = new Producto();
    let x = this.BD.getProductos();
    x.snapshotChanges().subscribe(item =>{
      this.productos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.productos.push(y as Producto);
      });
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    let x = this.BD.getUsuario(this.afAuth.auth.currentUser.uid);
    x.snapshotChanges().subscribe(item => {
      this.usuarios = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.usuarios.push(y as Usuario);
      });
      if (this.usuarios[0] == null) {
        this.usuario = this.BD.generarUsuario(this.afAuth.auth.currentUser, this.afAuth.auth.currentUser.uid);
      }
      else {
        this.usuario = this.usuarios[0];
      }
    });
  }

  logout() {
    this.usuario = undefined;
  }

  primerosDiez() {
    this.enviar = new Producto();
    let x = this.BD.getPrimerosDiez();
    x.snapshotChanges().subscribe(item =>{
      this.productos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.productos.push(y as Producto);
      });
    });
  }

  ultimosDiez() {
    this.enviar = new Producto();
    let x = this.BD.getUltimosDiez();
    x.snapshotChanges().subscribe(item =>{
      this.productos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.productos.push(y as Producto);
      });
    });
  }

  ngOnInit() {
    this.enviar = new Producto();
    let x = this.BD.getProductos();
    x.snapshotChanges().subscribe(item =>{
      this.productos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.productos.push(y as Producto);
      });
    });
  }

}
