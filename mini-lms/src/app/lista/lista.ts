import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EstudianteService, Estudiante } from '../estudiante/estudiante.service';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista.html'
})

export class Lista implements OnInit {
  estudiantes: Estudiante[] = [];
  cargando = true;

  constructor(
    private servicio: EstudianteService, // El servicio se inyecta en el constructor.
    private cd: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos) => {
        this.estudiantes = [...datos]; // asigna una referencia nueva del arreglo
        this.cargando = false;
        this.cd.detectChanges(); // fuerza la actualización de la vista HTML
      },
      error: (err) => {
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  estado(creditos: number): string {
    if (creditos < 1 || creditos > 24) {
      return 'Créditos inválidos';
    } else if (creditos >= 12) {
      return 'Matriculado';
    }
    return 'Pendiente';
  }
}
