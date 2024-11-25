import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
    )
    {
      this.registroForm = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(256)]],
        nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
        apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
      });
    }

  onRegistro(): void {
    if(this.registroForm.valid) {
      const usuarioNuevo = this.registroForm.value;

      this.loginService.registro(usuarioNuevo).subscribe({
        next: () => {
          this.toast.success("Debes iniciar sesión para continuar", "¡Registro exitoso!");
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          if(err.status == 400) {
            this.toast.error(`Hubo un problema con los datos proporcionados`, "¡Ups!");
          }
        }
      });
    } else {
      this.toast.warning("Completa todos los datos, por favor", "¡Atención!");
      this.registroForm.markAllAsTouched();
    }
  }

  goToLogin(): void {
    this.router.navigate(["/login"])
  }
}
