import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    estadoStock: string;
}

@Injectable({ providedIn: 'root' })

export class ProductoService {
    private url = 'https://careli2021.github.io/api_examen/api/productos.json';

    constructor(private http: HttpClient) { }
    
    obtenerProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.url);
    }
}