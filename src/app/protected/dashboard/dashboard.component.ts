import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../../auth/interfaces/auth.interfaces';
import { AuthService } from '../../auth/services/auth.service';

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

  public get usuario(): Usuario {
    return this.authService.usuario;
  }

  constructor(
    private router: Router,
    private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }

}
