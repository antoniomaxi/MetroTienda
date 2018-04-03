import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {Cuento} from '../cuento/cuento';
import { AngularFireAuth } from 'angularfire2/auth';
import {CuentoComponent} from '../cuento/cuento.component';
import {BdService} from '../servicios/bd.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [AngularFireAuth]
})
export class UsuarioComponent implements OnInit {



  constructor(user: Usuario) {

  }

  ngOnInit() {

  }


}
