import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../services/ombd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-em-cartaz',
  templateUrl: 'em-cartaz.page.html',
  styleUrls: ['em-cartaz.page.scss'],
  standalone: false
})
export class EmCartazPage implements OnInit {
  filmes: any[] = [];
  searchTerm: string = '';
  categoriaSelecionada = 'cartaz'; // Define que começa com filmes em cartaz

  constructor(private ombdService: OmbdService, private router: Router) {}

  ngOnInit() {
    this.searchTerm = '';
    this.getNowPlayingMovies();  // Carregar filmes em cartaz assim que a página for carregada
  }

  // Carrega filmes em cartaz
  getNowPlayingMovies() {
    this.ombdService.getNowPlaying().subscribe({
      next: (data) => {
        this.filmes = data.results;
      },
      error: (err) => {
        console.error('Erro ao buscar filmes em cartaz:', err);
      }
    });
  }

  // Função para buscar filmes ao digitar no campo de pesquisa
  searchMovies() {
    if (this.searchTerm.trim() === '') {
      this.getNowPlayingMovies();  // Carregar filmes em cartaz se o campo de busca estiver vazio
    } else {
      this.ombdService.searchMovie(this.searchTerm).subscribe({
        next: (data) => {
          this.filmes = data.results;
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
        }
      });
    }
  }

  // Função para exibir detalhes do filme
  showDetails(filme: any) {
    console.log('Filme escolhido:', filme);
    // Aqui você pode implementar navegação para página de detalhes ou exibir um modal com mais informações
  }

  // Função para alternar exibição da sinopse completa
  toggleSinopse(filme: any) {
    filme.mostrarSinopse = !filme.mostrarSinopse;
  }
}
