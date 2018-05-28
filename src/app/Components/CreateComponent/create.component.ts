import { Component, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PostService } from "./../../Services/PostService";
import { Post } from "./../../Models/Post";
import { ListComponent } from '../ListComponent/list.component';
import { debug } from 'util';
import { debounce } from 'rxjs/operators/debounce';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router/src/directives/router_link';
@Component({
  selector: 'createcomponent',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']

})
export class CreateNewPostComponent {

    CreateComponent: boolean;
    EditMode: boolean;
    isLoading: boolean;
    isSaved: boolean;
    NewPostData: Post;
    @ViewChild('parent', { read: ViewContainerRef }) HomeParent: ViewContainerRef;
    constructor(public postService: PostService, private componentFactoryResolver: ComponentFactoryResolver, private location: Location) {
        this.EditMode = false;
        this.CreateComponent = false;
        this.NewPostData = {
          "postId": null,
          "id": null,
          "name": "",
          "email": "",
          "body": ""
        };
    }
    ngAfterViewInit(): void {
        //this.HomeParent.element.nativeElement.textContent = "";  
    } 
    InitializePostData(homeparent: ViewContainerRef, post: Post) {
        this.isLoading = false;
        this.HomeParent = homeparent;
        console.log(homeparent);
        if (post != null) {
          this.NewPostData = post;
          this.EditMode = true;
        }
    }
    SavePost()
    {
        this.isLoading = true;
        this.postService.SavePostData(this.NewPostData).subscribe(data => this.saveCallBack(data), err => this.handleError(err));
    }

    saveCallBack(item: boolean)
    {
        if (item) {
            this.isLoading = false;
            alert("Sucessfully Saved");
            this.isSaved = true;
            this.HomeParent.remove();
            var listComponent = this.componentFactoryResolver.resolveComponentFactory(ListComponent);
            var createistreference = this.HomeParent.createComponent(listComponent);
            createistreference.instance.InitializeProductListing(this.HomeParent);
        } else {
            this.isLoading = false;
            this.isSaved = false;
            alert("failed to save data");
        }
    }
    handleError(errorstatus: any) {
        this.isLoading = false;
        this.isSaved = false;
        alert("failed to save data");
    }
}

