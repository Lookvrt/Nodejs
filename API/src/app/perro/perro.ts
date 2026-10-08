import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerroService, RespuestaPerros } from './perro.service';

@Component({
  selector: 'app-perro',
  standalone: true, // asegurar renderizado inmediato
  imports: [CommonModule],
  templateUrl: './perro.html'
})

export class Perro implements OnInit {
  perros: string[] = [];
  cargando = true;
  error = '';
  constructor(
    private servicio: PerroService,
    private cd: ChangeDetectorRef // inyectar detector de cambios
  ) { }

  ngOnInit(): void {
    this.cargarPerros();
  }
  
  cargarPerros(): void {
    this.cargando = true;
    this.error = '';
    this.servicio.obtenerPerros().subscribe({
      next: (respuesta: RespuestaPerros) => {
        this.perros = respuesta.message;
        this.cargando = false;
        this.cd.detectChanges(); // Fuerza el refresco de la plantilla inmediatamente
      },
      error: (err) => {
        console.error('Error al consumir la API', err);
        this.error = 'No se pudieron cargar las imágenes.';
        this.cargando = false;
      }
    });
  }
}