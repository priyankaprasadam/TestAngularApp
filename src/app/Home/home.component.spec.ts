import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { AppComponent } from './../app.component';
import { HomeComponent } from './home.component';
import { AppModule } from '../app.module';
import { PostService } from "../Services/PostService";
import { CreateNewPostComponent } from '../Components/CreateComponent/create.component';
import { ListComponent } from '../Components/ListComponent/list.component';
import { element } from 'protractor';
import { Post } from '../Models/Post';
import { expand } from 'rxjs/operator/expand';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let debugElement: DebugElement;
  let postService: PostService;
  let createNewPostComponent: CreateNewPostComponent;
  let listComponent: ListComponent;
  let componentFactoryResolver: ComponentFactoryResolver;

  beforeEach(async(() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PostService, CreateNewPostComponent, ListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    postService = TestBed.get(PostService);
    createNewPostComponent = TestBed.get(CreateNewPostComponent);
    listComponent = TestBed.get(ListComponent);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
  }));

  it('should create the home component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize ListComponent', async(() => {

    let spy = spyOn(component, 'listPosts').and.returnValue(Promise.resolve(true));
    component.ngAfterViewInit();
    const treechildCounter = 0;
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.listPosts).toHaveBeenCalled();
    });
  }));
  
});

