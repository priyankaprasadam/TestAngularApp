import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { PostService } from "./../Services/PostService";
import { CreateNewPostComponent } from './../Components/CreateComponent/create.component';
import { ListComponent } from './../Components/ListComponent/list.component';
import { element } from 'protractor';
import { Post } from './../Models/Post';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    posts: Post[];
    isLoadingPosts: boolean = true;
    treechildCounter: number = 0;
    @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;
    _componentRef: ComponentRef<any>;
    
    constructor(public postService: PostService, private componentFactoryResolver: ComponentFactoryResolver) {
    }
    ngAfterViewInit() {
      this.listPosts();
    }

  public listPosts() {
      this.parent.remove();
      var listComponent = this.componentFactoryResolver.resolveComponentFactory(ListComponent);
      this._componentRef = this.parent.createComponent(listComponent);
      this._componentRef.instance.InitializeProductListing(this.parent);
    }
  public onCreateNewPost() {
    this.parent.remove();
    var createComponent = this.componentFactoryResolver.resolveComponentFactory(CreateNewPostComponent);
    this._componentRef = this.parent.createComponent(createComponent);
    this._componentRef.instance.InitializePostData(this.parent, null);
  }
}



