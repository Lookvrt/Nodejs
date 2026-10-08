import { Routes } from '@angular/router';
import { Perro } from './perro/perro';

export const routes: Routes = [
    { path: 'perro', component: Perro },
    { path: '', redirectTo: 'perro', pathMatch: 'full' }
];
