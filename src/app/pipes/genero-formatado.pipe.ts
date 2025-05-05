import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generoFormatado',
  standalone:false
})
export class GeneroFormatadoPipe implements PipeTransform {

  // Definindo uma cor para cada gênero (exemplo)
  private generoCores: { [key: string]: string } = {
    'Action': '#FF5733',          // Laranja forte
    'Comedy': '#33FF57',          // Verde claro
    'Horror': '#FF33A1',          // Rosa choque
    'Thriller': '#339BFF',        // Azul vibrante
    'Drama': '#FFBF33',           // Amarelo ouro
    'Science Fiction': '#33FFFC', // Azul piscina
    'Animation': '#9C33FF',       // Roxo neon
    'Fantasy': '#33FFA1',         // Verde água
    'Adventure': '#FFC300',       // Amarelo escuro
    'Crime': '#C70039',           // Vermelho escuro
    'Romance': '#FF69B4',         // Rosa suave
    'Documentary': '#8E8E8E',     // Cinza neutro
    'Music': '#6A5ACD',           // Azul violeta
    'History': '#8B4513',         // Marrom terra
    'Family': '#20B2AA',          // Verde água médio
    'Mystery': '#483D8B',         // Azul escuro (DarkSlateBlue)
    'TV Movie': '#708090',        // Cinza azulado (SlateGray)
    'War': '#800000',             // Vinho (Maroon)
    'Western': '#D2691E'          // Chocolate (sugestivo de faroeste)
    // Adicione mais gêneros e suas cores aqui
  };

  transform(value: string): string {
    if (!value) return '#000000'; // Cor padrão (preto) caso não encontre o gênero
    return this.generoCores[value] || '#000000'; // Se o gênero não for encontrado, usa cor preta
  }

}
