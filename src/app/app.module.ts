import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabsModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './helper/in-memory.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StaticDataDemoComponent } from './static-data-demo/static-data-demo.component';
import { DynamicDataDemoComponent } from './dynamic-data-demo/dynamic-data-demo.component';
import { StaticWithTemplateDemoComponent } from './static-with-template-demo/static-with-template-demo.component';
import { NgxTableModule } from '@ommaralquisi/ng-x-table';

@NgModule({
  declarations: [
    AppComponent,
    StaticDataDemoComponent,
    DynamicDataDemoComponent,
    StaticWithTemplateDemoComponent
  ],
  imports: [
    BrowserModule,
    NgxTableModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    TabsModule.forRoot()
  ],
  providers: [
    {provide: 'currency', useClass: CurrencyPipe},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
