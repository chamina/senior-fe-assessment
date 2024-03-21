import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { HeaderComponent } from './header/header.component';
import { TaskpageComponent } from './taskpage/taskpage.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageGridComponent,
    HeaderComponent,
    TaskpageComponent,
    ImageModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
