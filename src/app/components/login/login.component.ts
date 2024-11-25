import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder)
    {
      this.loginForm = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(9)]],
      });
    }

  onLogin(): void {
    if(this.loginForm.valid) {
      const {email, clave} = this.loginForm.value;

      this.loginService.login(email, clave).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('email', response.email);

          this.toast.success("Disfruta de nuestro servicio de monitoreo", "¡Bienvenido!");
          this.router.navigate(["/dashboard"]);
        }, error: (err) => {
          if(err.status == 401) {
            this.toast.error("Datos incorrectos", "¡Ups!");

          } else {
            this.toast.error("Hubo un error inesperado", "¡Ups!");
          }
        }
      });
    } else {
      this.toast.warning("Completa todos los datos, por favor", "¡Atención!");
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegistro(): void {
    this.router.navigate(["/registro"])
  }
}
