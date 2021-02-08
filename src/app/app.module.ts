import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  ],
    
      
  bootstrap: [AppComponent],
  // providers: [LoggingService]
 
})
export class AppModule { }
