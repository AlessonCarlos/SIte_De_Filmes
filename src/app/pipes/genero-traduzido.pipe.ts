import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generoTraduzido',
  standalone:false
})
export class GeneroTraduzidoPipe implements PipeTransform {
  private traducoes: { [key: string]: string } = {
    'Action': 'Ação',
    'Comedy': 'Comédia',
    'Horror': 'Terror',
    'Thriller': 'Suspense',
    'Drama': 'Drama',
    'Science Fiction': 'Ficção Científica',
    'Animation': 'Animação',
    'Fantasy': 'Fantasia',
    'Adventure': 'Aventura',
    'Crime': 'Crime',
    'Romance': 'Romance',
    'Documentary': 'Documentário',
    'Music': 'Musical',
    'History': 'História',
    'Family': 'Família',
    'Mystery': 'Mistério',
    'TV Movie': 'Filme de TV',
    'War': 'Guerra',
    'Western': 'Faroeste'
  };

  transform(value: string): string {
    return this.traducoes[value] || value;
  }
}

