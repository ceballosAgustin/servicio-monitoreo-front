import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlantaService } from '../../core/services/planta.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import Planta from '../../core/models/planta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-planta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-planta.component.html',
  styleUrls: ['./editar-planta.component.css']
})
export class EditarPlantaComponent implements OnInit{
  @Input() planta: Planta | undefined;
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() plantaEditada: EventEmitter<void> = new EventEmitter<void>();

  mostrarModal: boolean = true;
  plantaOriginal: Planta | undefined;

  constructor(
    private plantaService: PlantaService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
      if(this.planta) {
        this.plantaOriginal = { ...this.planta }
      }
  }

  editarPlanta() {
    if (this.planta) {
      if(this.planta.lectura < 0 || this.planta.alertaMedia < 0 ||
        this.planta.alertaRoja < 0 || this.planta.sensorDeshabilitado < 0) {
          this.toast.error('Los valores no pueden ser negativos', '¡Error!');
          return;
        }
      this.plantaService.modificarPlanta(this.planta.idPlanta, this.planta).subscribe(
        response => {
          this.toast.success('Planta editada con éxito', '¡Genial!');
          this.plantaEditada.emit();
          this.cerrarModal.emit();
        },
        error => {
          console.error('Error al editar la planta:', error);
          this.toast.error('Error al editar la planta', '¡Ups!');
        }
      );
    }
  }

  cerrar() {
    if(this.planta && this.plantaOriginal) {
      Object.assign(this.planta, this.plantaOriginal);
    }

    this.cerrarModal.emit();
  }
}
