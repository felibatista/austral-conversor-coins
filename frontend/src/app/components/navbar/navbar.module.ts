import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule
  ],
  exports: [
    
  ]
})

export class NavbarModule { }
