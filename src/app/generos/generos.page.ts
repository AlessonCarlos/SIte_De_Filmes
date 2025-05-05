import { Component, OnInit } from '@angular/core';
import { FilmesService } from '../services/filmes.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.page.html',
  styleUrls: ['./generos.page.scss'],
  standalone: false
})
export class GenerosPage implements OnInit {
  generos: any[] = []; // Gêneros de filmes
  selectedGenero: number | null = null; // Gênero selecionado
  filmes: any[] = []; // Filmes filtrados por gênero

  constructor(private filmesService: FilmesService) {}

  // Carrega os gêneros ao inicializar o componente
  ngOnInit() {
    this.filmesService.getGeneros().subscribe({
      next: (res) => this.generos = res.genres,
      error: (err) => console.error('Erro ao buscar gêneros', err)
    });
  }

  // Filtra os filmes com base no gênero selecionado
  filterFilmes(generoId: number) {
    this.selectedGenero = generoId;
    this.filmesService.buscarFilmesPorGenero(generoId).subscribe({
      next: (res) => this.filmes = res.results,
      error: (err) => console.error('Erro ao buscar filmes', err)
    });
  }

  // Retorna a URL completa da imagem
  getImagemUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
