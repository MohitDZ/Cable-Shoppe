import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule , HeaderComponent , FooterComponent
  ],
  exports:[HeaderComponent , FooterComponent]
})
export class SharedModule { }
