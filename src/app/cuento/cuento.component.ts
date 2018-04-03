import {Cuento} from './cuento';
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
  selector: 'app-cuento',
  templateUrl: './cuento.component.html',
  styleUrls: ['./cuento.component.css'],
  providers: [BdService, AngularFireAuth]
})
export class CuentoComponent implements OnInit {

  cuentos: Cuento[];
  usuarios: Usuario[];
  enviar: Cuento;
  usuario: Usuario;
  borrar: boolean;

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private BD: BdService, private afAuth: AngularFireAuth, private arriba: UploadService) {
    this.borrar = false;
  }

  anadirCuento(form: NgForm) {
    this.enviar = new Cuento();
    if (form.value.cuerpo !== undefined) {
      if (form.value.cuerpo.length > 0 && form.value.cuerpo.length < 1000) {
        if ( this.currentUpload === null ) {
          this.usuario = this.BD.insertaCuento(form.value, this.usuario, null);
        }
        else {
          this.usuario = this.BD.insertaCuento(form.value, this.usuario, this.currentUpload);
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
    let x = this.BD.getCuentos();
    x.snapshotChanges().subscribe(item =>{
      this.cuentos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.cuentos.push(y as Cuento);
      });
    });
  }

  eliminar(cuentito) {
    this.BD.eliminarCuento(cuentito, this.usuario);
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

  verMisCuentos() {
    this.borrar = true;
    if (this.usuario.cuentos !== undefined ) {
      let aux: Cuento[];
      aux = new Array;
      for ( let i = 0 ; this.cuentos[i] !== undefined ; i++ ) {
        for ( let j = 0 ; this.usuario.cuentos[j] !== undefined ; j++ ) {
          if (this.cuentos[i].$id === (this.usuario.cuentos[j])) {
            aux.push(this.cuentos[i]);
          }
        }
      }
      this.cuentos = aux;
    }
    else {
      this.cuentos = null;
    }
  }

  subir() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.arriba.pushUpload(this.currentUpload);
  }

  regresar() {
    this.borrar = false;
    this.enviar = new Cuento();
    let x = this.BD.getCuentos();
    x.snapshotChanges().subscribe(item =>{
      this.cuentos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.cuentos.push(y as Cuento);
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
    this.enviar = new Cuento();
    let x = this.BD.getPrimerosDiez();
    x.snapshotChanges().subscribe(item =>{
      this.cuentos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.cuentos.push(y as Cuento);
      });
    });
  }

  ultimosDiez() {
    this.enviar = new Cuento();
    let x = this.BD.getUltimosDiez();
    x.snapshotChanges().subscribe(item =>{
      this.cuentos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.cuentos.push(y as Cuento);
      });
    });
  }


  ngOnInit() {
    this.enviar = new Cuento();
    let x = this.BD.getCuentos();
    x.snapshotChanges().subscribe(item =>{
      this.cuentos = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$id'] = element.key;
        this.cuentos.push(y as Cuento);
      });
    });
  }

}
