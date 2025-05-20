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
  // Lista de filmes a serem exibidos na tela
  filmes: any[] = [];

  // Termo digitado pelo usuário no campo de pesquisa
  searchTerm: string = '';

  // Categoria ativa (inicialmente setada como "cartaz", indicando filmes em cartaz)
  categoriaSelecionada = 'cartaz';

  // Injeta os serviços necessários: ombdService para chamadas à API e router para navegação
  constructor(private ombdService: OmbdService, private router: Router) {}

  // Executa assim que a página é carregada
  // Inicializa o campo de busca vazio e carrega os filmes em cartaz
  ngOnInit() {
    this.searchTerm = '';
    this.getNowPlayingMovies(); // Chama a função para buscar os filmes em cartaz
  }

  /**
   * Busca os filmes atualmente em cartaz utilizando o serviço ombdService.
   * Os resultados são atribuídos ao array this.filmes, usado no HTML para renderização.
   */
  getNowPlayingMovies() {
    this.ombdService.getNowPlaying().subscribe({
      next: (data) => {
        this.filmes = data.results; // Salva os filmes no array
      },
      error: (err) => {
        console.error('Erro ao buscar filmes em cartaz:', err);
      }
    });
  }

  /**
   * Busca filmes com base no termo digitado pelo usuário.
   * Se o campo estiver vazio, recarrega os filmes em cartaz.
   * Caso contrário, faz uma pesquisa com base no termo informado.
   */
  searchMovies() {
    if (this.searchTerm.trim() === '') {
      this.getNowPlayingMovies(); // Recarrega os filmes em cartaz se o campo estiver vazio
    } else {
      this.ombdService.searchMovie(this.searchTerm).subscribe({
        next: (data) => {
          this.filmes = data.results; // Salva os filmes encontrados na busca
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
        }
      });
    }
  }

  /**
   * Exibe os detalhes do filme selecionado.
   * Neste ponto, apenas registra o filme no console.
   * Pode ser expandido futuramente para abrir um modal ou navegar para uma página de detalhes.
   */
  showDetails(filme: any) {
    console.log('Filme escolhido:', filme);
    // Futuro: navegar para detalhes ou abrir modal
  }

  /**
   * Alterna a visibilidade da sinopse completa de um filme.
   * Se o campo "mostrarSinopse" for true, mostra a sinopse; se for false, oculta.
   * Utilizado no botão "Mostrar mais" / "Ocultar sinopse".
   */
  toggleSinopse(filme: any) {
    filme.mostrarSinopse = !filme.mostrarSinopse;
  }

  // Variável de controle para exibir ou ocultar uma mensagem personalizada
  mostrarMensagem = false;

  /**
   * Alterna o estado da variável mostrarMensagem entre true e false.
   * Pode ser usada para exibir uma mensagem informativa na tela.
   */
  toggleMensagem() {
    this.mostrarMensagem = !this.mostrarMensagem;
  }
}



