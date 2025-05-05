
import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../services/ombd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  filmes: any[] = [];
  searchTerm: string = '';
  categoriaSelecionada = 'filmes';
  mostrarMensagem = false;

  constructor(private ombdService: OmbdService, private router: Router) {}

  ngOnInit() {
    this.searchTerm = '';
    this.trocarCategoria();
  }

  toggleMensagem() {
    this.mostrarMensagem = !this.mostrarMensagem;
  }

  trocarCategoria() {
    if (this.categoriaSelecionada === 'filmes') {
      this.getPopularMovies();
    } else if (this.categoriaSelecionada === 'series') {
      this.getPopularSeries();
    } else if (this.categoriaSelecionada === 'cartaz') {
      this.irParaPaginaEmCartaz();
    }
  }

  getPopularMovies() {
    this.ombdService.getPopularMovies().subscribe({
      next: (data) => {
        this.filmes = data.results.map((filme: any) => ({
          ...filme,
          mostrarSinopse: false // adiciona flag para controle do ngIf
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar filmes populares:', err);
      }
    });
  }

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

  irParaPaginaEmCartaz() {
    this.router.navigate(['/em-cartaz']);
  }

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

  // Função para alternar visibilidade da sinopse
  toggleSinopse(filme: any) {
    filme.mostrarSinopse = !filme.mostrarSinopse;
  }

  showDetails(filme: any) {
    console.log('Filme selecionado:', filme);
    // Pode navegar para outra página futuramente
  }
}
