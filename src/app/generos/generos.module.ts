import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneroFormatadoPipe } from '../pipes/genero-formatado.pipe'; 
import { GeneroTraduzidoPipe } from '../pipes/genero-traduzido.pipe';
import { GeneroHoverDirective } from './genero-hover.directive'; 

import { IonicModule } from '@ionic/angular';

import { GenerosPageRoutingModule } from './generos-routing.module';

import { GenerosPage } from './generos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerosPageRoutingModule
    
  ],
  declarations: [GenerosPage, GeneroFormatadoPipe,GeneroTraduzidoPipe,GeneroHoverDirective]
})
export class GenerosPageModule {}
