import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `* {
      margin: 15px;
    }
    button[type="button"] {
      color: red;
      border: 1px solid red;
      padding: 3px 6px;
      border-radius: 5px;
    }
    button[type="button"]:hover {
      background-color: #F79E7C;
      color: #FFFFFF;
    }`
  ]
})
export class DashboardComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/auth', 'login']);
  }

}
