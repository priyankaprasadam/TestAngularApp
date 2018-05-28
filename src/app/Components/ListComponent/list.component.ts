import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { PostService } from "./../../Services/PostService";
import { CreateNewPostComponent } from './../CreateComponent/create.component';
import { element } from 'protractor';
import { Post } from './../../Models/Post';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  posts: Post[];
  isLoadingPosts: boolean = true;
  treechildCounter: number = 0;
  @ViewChild('parent', { read: ViewContainerRef }) HomeParent: ViewContainerRef;

  constructor(public postService: PostService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.getAllData();
  }
  public InitializeProductListing(homeparent: ViewContainerRef) {
    this.HomeParent = homeparent;
  }

  public updatePostData(item: Post) {
    this.HomeParent.remove();
    var createComponent = this.componentFactoryResolver.resolveComponentFactory(CreateNewPostComponent);
    var createistreference = this.HomeParent.createComponent(createComponent);
    createistreference.instance.InitializePostData(this.HomeParent, item);
  }
  public DeletePostData(item: Post) {
    this.postService.deletePostData(item).subscribe(data => this.DeletePostDataCallBack(data), err => this.handleError(err));
  }
  DeletePostDataCallBack(item: any) {
    if (item) {
      this.getAllData();
    }
    else {
      alert("Oops.!! Something went wrong while deleting the post.Please try again");
    }
  }
  getAllData() {
    this.postService.getAlldata().subscribe(data => this.getAlldataCallBack(data), err => this.handleError(err));
  }
  getAlldataCallBack(item: any) {
    if (item.length != 0) {
      setTimeout(() => {
        this.isLoadingPosts = false;
      }, 1000);
      this.posts = item;
      this.treechildCounter = this.posts.length;
    }
    else {
      setTimeout(() => {
        this.isLoadingPosts = false;
      }, 1000);
      this.posts = [];
    }
  }

  private handleError(errorstatus: any) {
         alert("Data not available");
  }
}



