import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { PostService } from './Services/PostService';
import { CreateNewPostComponent } from './Components/CreateComponent/create.component';
import { ListComponent } from './Components/ListComponent/list.component';
import { from } from 'rxjs/observable/from';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, CreateNewPostComponent, ListComponent
  ],
  imports: [/*NgbModule.forRoot(),*/
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  entryComponents: [CreateNewPostComponent, ListComponent, HomeComponent],
  providers: [PostService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
//export class MyDatabase implements LocalDatabase {

//  /* Implement the methods required by the LocalDatabase class */

//}
