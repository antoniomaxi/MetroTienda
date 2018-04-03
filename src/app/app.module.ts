import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {BdService} from './servicios/bd.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import {RouterModule, Routes} from '@angular/router';
import {UploadService} from './servicios/upload.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  {path: '', component: ProductoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AgmCoreModule.forRoot({
       apiKey: 'AIzaSyCu3U2o2Ab29Brcb84wwRwruAzmU4PIrts'
    })
  ],
  providers: [
    BdService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
