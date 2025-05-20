import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmCartazPageRoutingModule } from './em-cartaz-routing.module';

import { EmCartazPage } from './em-cartaz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmCartazPageRoutingModule
    
  ],
  declarations: [EmCartazPage]
})
export class EmCartazPageModule {}
