import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})

export class Productos implements OnInit {
  productos: Producto[] = [];
  busqueda = '';
  soloInsuficientes = false;
  cargando = false;
  error = '';

  constructor(
    private servicio: ProductoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { this.cargarProductos(); }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();
    this.servicio.obtenerProductos().subscribe({
      next: (datos: Producto[]) => {
        this.productos = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error HTTP:', err);
        this.error = 'No se pudieron obtener los productos.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
  
  get productosFiltrados(): Producto[] {
    const texto = this.busqueda.trim().toLowerCase();
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) &&
      (!this.soloInsuficientes || p.estadoStock === 'INSUFICIENTE')
    );
  }
  
}