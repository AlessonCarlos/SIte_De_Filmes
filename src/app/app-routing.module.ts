import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'em-cartaz',
    loadChildren: () => import('./em-cartaz/em-cartaz.module').then( m => m.EmCartazPageModule)
  },
  {
    path: 'em-cartaz',
    loadChildren: () => import('./em-cartaz/em-cartaz.page').then(m => m.EmCartazPage)
  },
  {
    path: 'generos',
    loadChildren: () => import('./generos/generos.module').then( m => m.GenerosPageModule)
  },

  {
    path: 'generos',
    loadChildren: () => import('./generos/generos.page').then(m => m.GenerosPage)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  }
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
