import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MatIconModule} from '@angular/material/icon';
import { MatGridListModule} from '@angular/material/grid-list';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FormsModule,
    HttpModule,
    MatSidenavModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule,
    RouterModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule
  ],
  providers: [HttpService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

