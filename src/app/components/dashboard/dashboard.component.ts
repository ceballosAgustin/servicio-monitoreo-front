import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import Usuario from '../../core/models/usuario';
import { LoginService } from '../../core/services/login.service';
import { UsuarioService } from '../../core/services/usuario.service';
import Planta from '../../core/models/planta';
import { PlantaService } from '../../core/services/planta.service';
import { CommonModule } from '@angular/common';
import { CrearPlantaComponent } from "../crear-planta/crear-planta.component";
import { EditarPlantaComponent } from '../editar-planta/editar-planta.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarEliminacionComponent } from '../confirmar-eliminacion/confirmar-eliminacion.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule, CrearPlantaComponent, EditarPlantaComponent, NgxPaginationModule, ConfirmarEliminacionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  lecturas: number = 0;
  alertasMedias: number = 0;
  alertasRojas: number = 0;
  sensoresDeshabilitados: number = 0;
  plantas: Planta[] = [];
  datos: Planta[] = [];
  authenticated: boolean = false;
  nombreUsuario: string = "";
  mostrarModalCrear: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarConfirmacion: boolean = false;
  plantaSeleccionada: Planta | undefined;
  plantaAEliminar: Planta | undefined;
  p: number = 1;
  dropdownOpen: number | null = null;

  constructor(
    private loginService: LoginService,
    private plantaService: PlantaService,
    private toast: ToastrService) {}

  ngOnInit(): void {
    this.getResumen();
    this.getPlantas();
    this.actualizarPlantas();
    this.authenticated = this.loginService.isAuthenticated();
    this.nombreUsuario = localStorage.getItem("nombre") == null ? "Usuario" : localStorage.getItem("nombre")!
  }

  getResumen(): void {
    this.plantaService.getLecturas().subscribe({
      next: (data) => this.lecturas = data,
      error: (err) => console.error('Error al obtener las lecturas:', err)
    });

    this.plantaService.getAlertasMedias().subscribe({
      next: (data) => this.alertasMedias = data,
      error: (err) => console.error('Error al obtener las alertas medias:', err)
    });

    this.plantaService.getAlertasRojas().subscribe({
      next: (data) => this.alertasRojas = data,
      error: (err) => console.error('Error al obtener las alertas rojas:', err)
    });

    this.plantaService.getSensoresDeshabilitados().subscribe({
      next: (data) => this.sensoresDeshabilitados = data,
      error: (err) => console.error('Error al obtener los sensores deshabilitados:', err)
    });
  }

  getPlantas(): void {
    this.plantaService.getPlantas().subscribe({
      next: (data) => this.plantas = data,
      error: (err) => console.error('Error al obtener todas las plantas:', err)
    });
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  abrirModalEditar(planta: Planta) {
    this.plantaSeleccionada = planta;
    this.mostrarModalEditar = true;
    this.dropdownOpen = null;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.plantaSeleccionada = undefined;
  }

  actualizarPlantas(): void {
    this.plantaService.getPlantas().subscribe({
      next: (data) => this.plantas = data,
      error: (err) => console.error('Error al obtener todas las plantas:', err)
    });
  }

  actualizarPlantasYResumen(): void {
    this.actualizarPlantas();
    this.getResumen();
  }

  confirmarEliminacion(planta: Planta) {
    this.plantaAEliminar = planta;
    this.mostrarConfirmacion = true;
  }

  eliminarPlantaConfirmado() {
    if(this.plantaAEliminar) {
      this.plantaService.eliminarPlanta(this.plantaAEliminar.idPlanta).subscribe({
        next: () => {
          this.toast.success('Se ha eliminado la Planta', '¡Genial!');
          this.actualizarPlantas();
          this.getResumen();
          this.dropdownOpen = null;
          this.mostrarConfirmacion = false;
        },
        error: (err) => {
          console.error('Error al eliminar la Planta', err);
          this.toast.error('Error al eliminar la planta', '¡Ups!');
        }
      })
    }
  }

  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.plantaAEliminar = undefined;
  }

  toggleDropdown(id: number) {
    this.dropdownOpen = this.dropdownOpen === id ? null : id;
  }
}
