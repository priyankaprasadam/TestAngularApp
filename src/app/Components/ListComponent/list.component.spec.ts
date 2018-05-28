import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { AppComponent } from './../../app.component';
import { ListComponent } from './list.component';
import { AppModule } from './../../app.module';
import { PostService } from "./../../Services/PostService";
import { HomeComponent } from './../../Home/home.component';
import { CreateNewPostComponent } from './../../Components/CreateComponent/create.component';
import { element } from 'protractor';
import { Post } from './../../Models/Post';
import { expand } from 'rxjs/operator/expand';
import { Packet } from '_debugger';
import { Observable } from 'rxjs';
import { window } from 'rxjs/operators/window';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
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
      providers: [CreateNewPostComponent, { provide: postService, useClass: MockpostService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    postService = TestBed.get(PostService);
    createNewPostComponent = TestBed.get(CreateNewPostComponent);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
    component.posts = [];
    component.isLoadingPosts = true;
    component.treechildCounter = 0;
  }));
  

  it('should create the ListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get all data on load', async(() => {
    component.getAllData();
  }));

  it('should Initialize Product Listing', async(() => {
    let vcRef: ViewContainerRef;
    component.InitializeProductListing(vcRef);
    expect(component.HomeParent).toBe(vcRef);
  }));

  it('should Delete a valid Post Data', async(() => {

    let spy = spyOn(component, 'DeletePostDataCallBack').and.returnValue(Promise.resolve(true));
    var _dummy_post: Post = {
      "postId": 1,
      "id": 1,
      "name": "test",
      "email": "test",
      "body": "test"
    };
    component.DeletePostData(_dummy_post);
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.DeletePostDataCallBack).toHaveBeenCalled();
    });
  }));
  it('On Successfull Delete should list data again', async(() => {

    let spy = spyOn(component, 'getAllData').and.returnValue(Promise.resolve(true));
    component.DeletePostDataCallBack(true);
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.getAllData).toHaveBeenCalled();
    });
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
    return Observable.of(true);
  }
};
