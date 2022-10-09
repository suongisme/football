import { SpinnerComponent } from './core/components/_spinner/spinner.component';
import { LayoutRouteModule } from './layout/layout-route.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutRouteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
