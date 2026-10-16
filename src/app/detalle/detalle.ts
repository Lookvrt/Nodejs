import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante.service';

interface EstudianteDetalle{
  id: number;
  promedio: number;
  estado: 'Aprobado' | 'Desaprobado';
  observacion: 'Excelente' | 'Promedio' | 'En riesgo';
}

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html'
})

export class Detalle implements OnInit {
  private servicio = inject(EstudianteService);
  private route = inject(ActivatedRoute);
  estudianteDetalle: EstudianteDetalle | null = null;
  cargando = false;
  error = '';

  constructor(
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarDetalle(id);
    }
  }

  private cargarDetalle(id: number): void {
  this.cargando = true;
  this.error = '';

  this.servicio.obtenerEstudiantes().subscribe({
    next: (lista: Estudiante[]) => {
      const encontrado = lista.find(e => e.id === id);
      this.estudianteDetalle = encontrado ? this.procesarMétricas(encontrado) : null;
      this.cargando = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error HTTP:', err);
      this.error = 'No se pudo obtener la información del estudiante.';
      this.cargando = false;
      this.cdr.detectChanges();
    }
  });
}

  private procesarMétricas(e: Estudiante): EstudianteDetalle {
    const nota1 = e.nota1 ?? 0;
    const nota2 = e.nota2 ?? 0;
    const nota3 = e.nota3 ?? 0;
    const promedio = (nota1 + nota2 + nota3) / 3;

    return {
      id: e.id,
      promedio,
      estado: promedio >= 10.5 ? 'Aprobado' : 'Desaprobado',
      observacion: promedio >= 17 ? 'Excelente' : promedio >= 13 ? 'Promedio' : 'En riesgo'
    };
  }
}