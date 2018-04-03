import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MetroTienda';
  lat: number = 10.499492174813447;
  lng: number = -66.7857438325882;

  click(event) {
    console.log(event);
  }
}
