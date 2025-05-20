import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../services/ombd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone:false
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = []; // Guarda a lista de filmes favoritos
  filmeDetalhes: any = null; // guarda o filme selecionado para mostrar detalhes

  constructor(private ombdService: OmbdService, private router: Router) {}

  ngOnInit() {
    this.carregarFavoritos(); // Quando a página carregar, pega os favoritos
  }

  // Pega os filmes favoritos do localStorage via service e atualiza a lista
  carregarFavoritos() {
    this.favoritos = this.ombdService.getFavorites();
  }

  // Remove um filme dos favoritos
  removerFavorito(filme: any) {
    let favoritos = this.ombdService.getFavorites(); // Pega a lista atual
    favoritos = favoritos.filter(f => f.id !== filme.id); // Filtra removendo o filme clicado
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Salva a lista atualizada
    this.carregarFavoritos(); // Atualiza a lista exibida na tela
  }

  // Navega para a página de detalhes do filme
  abrirDetalhes(filme: any) {
    this.router.navigate(['/detalhes', filme.id]); // Passa o id do filme na rota
  }

  

mostrarDetalhes(filme: any) {
  // Se o mesmo filme for clicado de novo, fecha os detalhes (toggle)
  if (this.filmeDetalhes && this.filmeDetalhes.id === filme.id) {
    this.filmeDetalhes = null;
    return;
  }

  this.ombdService.getMovieDetails(filme.id).subscribe(
    data => {
      this.filmeDetalhes = data;
    },
    error => {
      console.error('Erro ao carregar detalhes:', error);
    }
  );
}

fecharDetalhes() {
  this.filmeDetalhes = null;
}

}
