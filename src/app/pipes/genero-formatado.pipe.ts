import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generoFormatado',
  standalone:false
})
export class GeneroFormatadoPipe implements PipeTransform {

  // Definindo uma cor para cada gênero (exemplo)
  private generoCores: { [key: string]: string } = {
    // 'Action': '#ffffff',          // Laranja forte
    // 'Comedy': '#ffffff',          // Verde claro
    // 'Horror': '#ffffff',          // Rosa choque
    // 'Thriller': '#ffffff',        // Azul vibrante
    // 'Drama': '#ffffff',           // Amarelo ouro
    // 'Science Fiction': 'ffffff', // Azul piscina
    // 'Animation': '#ffffff',       // Roxo neon
    // 'Fantasy': '#ffffff',         // Verde água
    // 'Adventure': '#ffffff',       // Amarelo escuro
    // 'Crime': '#ffffff',           // Vermelho escuro
    // 'Romance': '#ffffff',         // Rosa suave
    // 'Documentary': '#ffffff',     // Cinza neutro
    // 'Music': '#ffffff',           // Azul violeta
    // 'History': '#ffffff',         // Marrom terra
    // 'Family': '#ffffff',          // Verde água médio
    // 'Mystery': '#ffffff',         // Azul escuro (DarkSlateBlue)
    // 'TV Movie': '#ffffff',        // Cinza azulado (SlateGray)
    // 'War': '#ffffff',             // Vinho (Maroon)
    // 'Western': '#ffffff'          // Chocolate (sugestivo de faroeste)
    // // Adicione mais gêneros e suas cores aqui
  };

  transform(value: string): string {
    if (!value) return '#000000'; // Cor padrão (preto) caso não encontre o gênero
    return this.generoCores[value] || '#000000'; // Se o gênero não for encontrado, usa cor preta
  }

}
