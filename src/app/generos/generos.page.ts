import { Component, OnInit } from '@angular/core';
import { FilmesService } from '../services/filmes.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.page.html',
  styleUrls: ['./generos.page.scss'],
  standalone: false
})

// toda essa pagina ta trazendo o HttpClient que por consequencia vão para o home.page.ts
export class GenerosPage implements OnInit {
  generos: any[] = []; // Gêneros de filmes
  selectedGenero: number | null = null; // Gênero selecionado
  filmes: any[] = []; // Filmes filtrados por gênero

  constructor(private filmesService: FilmesService) {}
  //Resumo simples:
  //Quando o componente for criado, ele automaticamente carrega a lista de gêneros de filmes da API e salva essa lista em this.generos. Se houver erro, mostra uma mensagem no console.
  // Carrega os gêneros ao inicializar o componente
  ngOnInit() {
    //this.filmesService.getGeneros()
    //Essa chamada está pedindo ao serviço filmesService que busque os gêneros de filmes.
    this.filmesService.getGeneros().subscribe({
      next: (res) => this.generos = res.genres,
      error: (err) => console.error('Erro ao buscar gêneros', err)
    });
  }

  // Filtra os filmes com base no gênero selecionado
  filterFilmes(generoId: number) {
    this.selectedGenero = generoId;
    // a linha do genero html {{ filme.overview, filme.title e vote_average }} vem daqui
    // ele chama o objeto filmes da api e joga no html
    this.filmesService.buscarFilmesPorGenero(generoId).subscribe({
      next: (res) => this.filmes = res.results,
      error: (err) => console.error('Erro ao buscar filmes', err)
    });
  }

  // Retorna a URL completa da imagem
  getImagemUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
// mostra o nome dos integrantes do grupo
  mostrarMensagem = false;

  toggleMensagem() {
    this.mostrarMensagem = !this.mostrarMensagem;
}


}
