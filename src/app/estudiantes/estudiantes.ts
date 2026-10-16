import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './estudiantes.html'
})

export class Estudiantes implements OnInit {
  estudiante: Estudiante[] = [];
  cargando = false;
  error = '';

  constructor(
    private servicio: EstudianteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { this.cargarEstudiantes(); }

  cargarEstudiantes(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();
    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos: Estudiante[]) => {
        this.estudiante = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error HTTP:', err);
        this.error = 'No se pudieron obtener los estudiante.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}