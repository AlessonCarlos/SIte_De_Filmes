
import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../services/ombd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})

/**
 * HOME PAGE COMPONENT
 * 
 * Responsabilidade Principal:
 * Atuar como mediador entre o serviço de dados (OMDbService) e a view (HTML).
 * 
 * Fluxo de Dados:
 * 1. O componente solicita dados ao OMDbService (filmes, séries, etc)
 * 2. O serviço retorna os dados da API
 * 3. O componente processa e formata os dados conforme necessário
 * 4. Os dados são disponibilizados para o template HTML através de:
 *    - Propriedades públicas (ex: this.filmes)
 *    - Métodos públicos (ex: getImagemUrl())
 * 
 * Interação com o Template:
 * - Fornece os dados para exibição (via data binding)
 * - Gerencia eventos do usuário (cliques, buscas, etc)
 * - Controla o estado da view (ex: sinopses expandidas)
 * 
 * Estrutura típica:
 * [Service] <-(dados)-> [Componente TS] <-(binding)-> [Template HTML]
 */


export class HomePage implements OnInit {

  filmes: any[] = [];
  favoritos: any[] = [];
  searchTerm: string = '';
  categoriaSelecionada = 'filmes';
  mostrarMensagem = false;

  constructor(private ombdService: OmbdService, private router: Router) { }

  //inicia função de favoritar filmes
  

  /**
   * Inicialização do componente
   * 
   * Ações realizadas:
   * 1. Inicializa o campo de busca como vazio (this.searchTerm = '')
   * 2. Carrega automaticamente os itens da categoria padrão 
   *    através do método trocarCategoria()
   * 
   * Este método é chamado automaticamente pelo Angular quando o componente é criado
   */
  ngOnInit() {
    this.searchTerm = '';
    this.trocarCategoria();
  }

  /**
   * Alterna a exibição da mensagem de créditos no footer
   * 
   * Funcionamento:
   * - Inverte o estado atual da variável mostrarMensagem
   * - Se true -> false
   * - Se false -> true
   * 
   * Controla a visibilidade da seção "GRUPO FORMADO POR" no rodapé
   */
  toggleMensagem() {
    this.mostrarMensagem = !this.mostrarMensagem;
  }

  /**
   * Retorna para o estado inicial do componente
   * 
   * Ações realizadas:
   * 1. Limpa o termo de busca (this.searchTerm = '')
   * 2. Recarrega os itens da categoria atualmente selecionada
   *    chamando trocarCategoria()
   * 
   * Equivalente a um "reset" da visualização atual
   */
  voltarInicio() {
    this.searchTerm = '';
    this.trocarCategoria();
  }

  /**
   * Gerencia a troca entre as categorias disponíveis
   * 
   * Categorias suportadas:
   * - 'filmes': Carrega filmes populares via getPopularMovies()
   * - 'series': Carrega séries populares via getPopularSeries()
   * - 'cartaz': Navega para a página /em-cartaz
   * 
   * A categoria ativa é determinada por this.categoriaSelecionada
   */
  trocarCategoria() {
    if (this.categoriaSelecionada === 'filmes') {
      this.getPopularMovies();
    } else if (this.categoriaSelecionada === 'series') {
      this.getPopularSeries();
    } else if (this.categoriaSelecionada === 'cartaz') {
      this.irParaPaginaEmCartaz();
    }
  }

  /**
   * Obtém a lista de filmes populares da API
   * 
   * Fluxo de execução:
   * 1. Faz requisição ao serviço ombdService.getPopularMovies()
   * 2. Em caso de sucesso:
   *    - Mapeia os resultados para adicionar a propriedade mostrarSinopse
   *    - Atualiza this.filmes com os dados recebidos
   * 3. Em caso de erro:
   *    - Loga o erro no console
   * 
   * Cada filme recebe mostrarSinopse = false por padrão
   */
  getPopularMovies() {
    this.ombdService.getPopularMovies().subscribe({
      next: (data) => {
        this.filmes = data.results.map((filme: any) => ({
          ...filme,
          mostrarSinopse: false
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar filmes populares:', err);
      }
    });
  }

  /**
   * Obtém a lista de séries populares da API
   * 
   * Fluxo idêntico ao getPopularMovies(), mas para séries
   * Utiliza ombdService.getPopularSeries()
   */
  getPopularSeries() {
    this.ombdService.getPopularSeries().subscribe({
      next: (data) => {
        this.filmes = data.results.map((filme: any) => ({
          ...filme,
          mostrarSinopse: false
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar séries populares:', err);
      }
    });
  }

  /**
   * Navega para a página de filmes em cartaz
   * 
   * Utiliza o Router do Angular para navegar para a rota '/em-cartaz'
   * 
   * @see Router.navigate()
   */
  irParaPaginaEmCartaz() {
    this.router.navigate(['/em-cartaz']);
  }

  /**
   * Realiza busca de filmes/séries por termo
   * 
   * Comportamento:
   * - Se o termo estiver vazio (apenas espaços): recarrega a categoria atual
   * - Se o termo contiver texto:
   *   * Para categoria 'filmes': chama ombdService.searchMovie()
   *   * Para categoria 'series': chama ombdService.searchTVShow()
   * 
   * Em ambos os casos de busca:
   * - Adiciona a propriedade mostrarSinopse = false a cada item
   * - Atualiza this.filmes com os resultados
   * - Loga erros no console em caso de falha
   */
  searchMovies() {
    if (this.searchTerm.trim() === '') {
      this.trocarCategoria();
    } else {
      if (this.categoriaSelecionada === 'filmes') {
        this.ombdService.searchMovie(this.searchTerm).subscribe({
          next: (data) => {
            this.filmes = data.results.map((filme: any) => ({
              ...filme,
              mostrarSinopse: false
            }));
          },
          error: (err) => {
            console.error('Erro ao buscar filmes:', err);
          }
        });
      } else if (this.categoriaSelecionada === 'series') {
        this.ombdService.searchTVShow(this.searchTerm).subscribe({
          next: (data) => {
            this.filmes = data.results.map((filme: any) => ({
              ...filme,
              mostrarSinopse: false
            }));
          },
          error: (err) => {
            console.error('Erro ao buscar séries:', err);
          }
        });
      }
    }
  }

  /**
   * Alterna a exibição da sinopse de um filme/série específico
   * 
   * @param filme - O objeto filme/série que terá sua sinopse alternada
   * 
   * Funcionamento:
   * - Inverte o valor atual de filme.mostrarSinopse
   * - Se true -> false (oculta sinopse)
   * - Se false -> true (exibe sinopse)
   */
  toggleSinopse(filme: any) {
    filme.mostrarSinopse = !filme.mostrarSinopse;
  }

  /**
   * Adiciona um filme/série aos favoritos salvos no localStorage
   * 
   * @param filme - O objeto filme/série a ser favoritado
   * 
   * Fluxo:
   * 1. Carrega os favoritos atuais do localStorage (se ainda não carregados)
   * 2. Verifica se o item já está favoritado (por ID)
   * 3. Se não estiver:
   *    - Adiciona ao array de favoritos
   *    - Marca como favoritado (filme.favoritado = true)
   *    - Salva no localStorage
   * 4. Se já estiver favoritado: exibe alerta
   */
  addToFavorites(filme: any) {
    if (!this.favoritos) {
      this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    }

    const jaFavoritado = this.favoritos.some(f => f.id === filme.id);

    if (!jaFavoritado) {
      this.favoritos.push(filme);
      filme.favoritado = true;
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    } else {
      alert('Filme já foi favoritado.');
    }
  }
}
