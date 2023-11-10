import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorComponent } from './conversor.component';
import { from } from 'rxjs';
import { Foreing } from 'src/app/types/foreing';

@NgModule({
  declarations: [
    ConversorComponent
  ],
  imports: [
    CommonModule
  ]
})

export class ConversorModule { 

}
