import { Routes } from '@angular/router';
import { Lista } from './lista/lista';
import { Agregar } from './agregar/agregar';

export const routes: Routes = [
    { path: '', component: Lista },
    { path: 'agregar', component: Agregar },
    { path: '**', redirectTo: '' }
];