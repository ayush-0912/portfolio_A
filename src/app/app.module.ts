import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

// 1. Import Lucide Module and the specific icons you are using in your template
import { 
  LucideAngularModule, 
  Mail, 
  Linkedin, 
  MapPin, 
  Phone, 
  ChevronDown, 
  Award, 
  Star, 
  Code, 
  Server, 
  Database, 
  Menu, 
  X 
} from 'lucide-angular';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 2. Configure Lucide by "picking" the icons you need
    LucideAngularModule.pick({
      Mail, 
      Linkedin, 
      MapPin, 
      Phone, 
      ChevronDown, 
      Award, 
      Star, 
      Code, 
      Server, 
      Database, 
      Menu, 
      X
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }