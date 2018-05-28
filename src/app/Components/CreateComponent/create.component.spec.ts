import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { AppComponent } from './../../app.component';
import { CreateNewPostComponent } from './create.component';
import { AppModule } from './../../app.module';
import { PostService } from "./../../Services/PostService";
import { HomeComponent } from './../../Home/home.component';
import { ListComponent } from './../../Components/ListComponent/list.component';
import { element } from 'protractor';
import { Post } from './../../Models/Post';
import { expand } from 'rxjs/operator/expand';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CreateNewPostComponent', () => {
  let fixture: ComponentFixture<CreateNewPostComponent>;
  let component: CreateNewPostComponent;
  let debugElement: DebugElement;
  let postService: PostService;
  let createNewPostComponent: CreateNewPostComponent;
  let listComponent: ListComponent;
  let componentFactoryResolver: ComponentFactoryResolver;
  let viewContainerRef: ViewContainerRef;
  beforeEach(async(() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ListComponent, { provide: postService, useClass: MockpostService }, Location], 
    }).compileComponents();
    fixture = TestBed.createComponent(CreateNewPostComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    postService = TestBed.get(PostService);
    listComponent = TestBed.get(ListComponent);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
    component.EditMode = false;
    component.CreateComponent = false;
    component.NewPostData = {
      "postId": null,
      "id": null,
      "name": "",
      "email": "",
      "body": ""
    };
    component.HomeParent = null;
    component.ngAfterViewInit();
    
  }));

  it('should create the CreateNewPostComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize CreateComponentData for update', async(() => {
    var _dummyPostData: Post = {
      "postId": null,
      "id": null,
      "name": "",
      "email": "",
      "body": ""
    };
    component.InitializePostData(viewContainerRef, _dummyPostData);
    expect(component.NewPostData).toBe(_dummyPostData);
    expect(component.EditMode).toBeTruthy();
  }));

  it('should give error while saving incorrect ComponentData', async(() => {
    component.NewPostData = null;
    component.SavePost();
    expect(component.isSaved).toBeFalsy();
  }));
});


export class MockpostService {
  posts: Post[] = [{
    "postId": 1,
    "id": 1,
    "name": "test",
    "email": "test",
    "body": "test"
  }];
  public getAlldata(): Observable<Post[]> {
    return Observable.of(this.posts);
  }
  public deletePostData(post: Post): Observable<boolean> {
    return Observable.of(true);
  }
  public SavePostData(post: Post): Observable<boolean> {
    if (post != undefined || post != null)
      return Observable.of(true);
    else
      return Observable.of(false);
  }
};

