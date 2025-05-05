import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appGeneroHover]',
  standalone:false  // O seletor será usado no HTML
})
export class GeneroHoverDirective {

  @HostBinding('style.background-color') backgroundColor: string = 'transparent';   // Cor padrão dos botões

  // Definindo a cor ao passar o mouse
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'lightyellow'; // Cor de fundo ao passar o mouse
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent';  // Volta para preto quando o mouse sai
  }
}
