import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import { Producto } from '../producto/producto';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductoComponent } from '../producto/producto.component';
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
