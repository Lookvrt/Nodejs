import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Estudiante {
    nombre: string;
    creditos: number;
}

@Injectable({
    providedIn: 'root'
})

export class EstudianteService {
    private url = './estudiante.json'; // JSON local
    private listaEstudiantes: Estudiante[] = [];

    constructor(private http: HttpClient) { }
    
    obtenerEstudiantes(): Observable<Estudiante[]> {
        // Si ya cargamos los datos, devolvemos la lista en memoria
        if (this.listaEstudiantes.length > 0) {
            return of(this.listaEstudiantes);
        }
        
        // Si es la primera vez, realiza la petición HTTP GET al JSON
        return this.http.get<Estudiante[]>(this.url).pipe(
            tap((data) => {
                this.listaEstudiantes = data;
            })
        );
    }
    
    // Simula guardar en la API (POST) guardando en el arreglo en memoria
    agregarEstudiante(nuevo: Estudiante): Observable<Estudiante[]> {
        this.listaEstudiantes.push(nuevo);
        return of(this.listaEstudiantes);
  }
}