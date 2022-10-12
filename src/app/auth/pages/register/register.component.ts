import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }

  register(): void {
    const { name, email, password } = this.miFormulario.value;
    this.authService.registro(name, email, password)
      .subscribe({
        next: registered => {
          if (registered === true) {
            this.router.navigate(['/protected', 'dashboard']);
          }
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.msg,
          })
        }
      });

  }

}
