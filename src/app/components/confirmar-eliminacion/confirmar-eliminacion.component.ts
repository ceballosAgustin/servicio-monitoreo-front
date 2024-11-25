import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar-eliminacion',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrls: ['./confirmar-eliminacion.component.css']
})
export class ConfirmarEliminacionComponent {
  @Output() confirmar: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelar: EventEmitter<void> = new EventEmitter<void>();

  confirmarEliminacion() {
    this.confirmar.emit();
  }

  cancelarEliminacion() {
    this.cancelar.emit();
  }
}
