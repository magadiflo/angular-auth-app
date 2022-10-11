import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }

  login(): void {
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password)
      .subscribe(response => {
        console.log(response);
        if (response.ok === true) {
          this.router.navigate(['/protected', 'dashboard']);
        }
      });
  }

}
