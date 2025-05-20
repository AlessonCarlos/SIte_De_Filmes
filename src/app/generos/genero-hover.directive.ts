import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appGeneroHover]',
  standalone:false  // O seletor será usado no HTML
})
export class GeneroHoverDirective {

  @HostBinding('style.background-color') backgroundColor: string = 'transparent'; // Fundo transparente por padrão
  @HostBinding('style.color') color: string = 'white'; // Letras brancas por padrão

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'white'; // Fundo branco ao passar o mouse
    this.color = 'black'; // Letras pretas ao passar o mouse
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent'; // Fundo volta a ser transparente ao remover o mouse
    this.color = 'white'; // Letras voltam a ser brancas ao remover o mouse
  }
}
