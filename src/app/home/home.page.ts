import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../services/ombd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  filmes: any[] = [];
  searchTerm: string = '';

  constructor(private ombdService: OmbdService) {}

  ngOnInit() {
    // Carregar filmes em cartaz assim que o componente for inicializado
    this.loadMovies();
  }

  // Função para carregar filmes em cartaz (inicial)
  loadMovies() {
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
      this.loadMovies(); // Carregar filmes iniciais se o campo de busca estiver vazio
    } else {
      this.ombdService.searchMovie(this.searchTerm).subscribe({
        next: (data: any) => {
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
}
