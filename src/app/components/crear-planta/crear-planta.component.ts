import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlantaService } from '../../core/services/planta.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Planta from '../../core/models/planta';
import { PaisService } from '../../core/services/pais.service';
import Pais from '../../core/models/pais';

@Component({
  selector: 'app-crear-planta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-planta.component.html',
  styleUrls: ['./crear-planta.component.css']
})
export class CrearPlantaComponent implements OnInit{
  @Output() plantaCreada: EventEmitter<void> = new EventEmitter<void>();
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter<void>();
  planta: any = {};
  paises: Pais[] = [];
  mostrarModal: boolean = true;
  isDropdownOpen: boolean = false;

  constructor(
    private plantaService: PlantaService,
    private paisService: PaisService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises() {
    this.paisService.obtenerPaises().subscribe(
      (response: Pais[]) => {
        this.paises = response.sort((a: Pais, b: Pais) => a.nombre.localeCompare(b.nombre));
      },
      error => {
        console.error('Error al obtener los países:', error);
      }
    );
  }

  crearPlanta() {
    this.planta.nombre = this.capitalizarNombre(this.planta.nombre);
    this.plantaService.crearPlanta(this.planta).subscribe(
      response => {
        this.toast.success('Planta creada con éxito', '¡Genial!');
        this.plantaCreada.emit();
        this.cerrarModal.emit();
      },
      error => {
        console.error('Error al crear la planta:', error);
        if (error.error && error.error.error === "El nombre de la planta ya está en uso, escoja otro") {
          this.toast.warning('El nombre de la planta ya está en uso', '¡Por favor ingrese otro!');
        } else {
          this.toast.warning('Error al crear la planta', '¡Ups!');
        }
      }
    );
  }

  capitalizarNombre(nombre: string): string {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }

  seleccionarPais(nombrePais: string): void {
    this.planta.pais = nombrePais;
    this.isDropdownOpen = false;
  }

  getBandera(nombrePais: string): string | undefined {
    const pais = this.paises.find(p => p.nombre === nombrePais);
    return pais ? pais.bandera : undefined;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
