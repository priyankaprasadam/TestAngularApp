// <copyright file="PostService" company="Baker Hughes" author="Priyanka">
// All Rights Reserved. Copyright © Baker Hughes 2018
// This computer program may not be used, copied, distributed, corrected, modified,
// translated, transmitted or assigned without Baker Hughes's prior written authorization
// </copyright>

// <summary>
// The <see cref="PostService"/> class file.
// </summary>
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { debug } from 'util';
import { Post } from "./../Models/Post";
import { element } from 'protractor';

/*
  The PostService service handles the Post Data.
*/

@Injectable()
export class PostService {

  // #region Constructor
  PostData: Post[];

  /// <summary>
  /// Constructor for PostServices.
  /// </summary>
  constructor() {
    this.PostData = [];
  }
  // #endregion

  // #region Methods

  /// <summary>
  /// Method for get all posts from data.
  /// </summary>
  public getAlldata(): Observable<Post[]> {
    return Observable.of(this.readPostDataFromLocalStorage());
  }

  /// <summary>
  /// Method for get all posts from LocalStorage.
  /// </summary>
  readPostDataFromLocalStorage() : Post[] {
    var posts: Post[];
    var postData = JSON.parse(localStorage.getItem("PostData"));
    if (postData != null && postData != undefined) {
      posts = postData;
    } else {
      posts = [];
    }
    return posts;
  }

  /// <summary>
  /// Method to delete a post from data.
  /// </summary>
  public deletePostData(item: Post): Observable<boolean> {
    this.PostData = this.readPostDataFromLocalStorage();
    var delete_post: Post = this.PostData.filter(post => post.id == item.id)[0];
    const index: number = this.PostData.indexOf(delete_post);
    if (index !== -1) {
      this.PostData.splice(index, 1);
      window.localStorage.setItem('PostData', JSON.stringify(this.PostData));
      return Observable.of(true);
    } else {
      return Observable.of(false);
    }
  }
  /// <summary>
  /// Method to save post to data.
  /// </summary>
  public SavePostData(post_in: Post): Observable<boolean> {
    this.PostData = this.readPostDataFromLocalStorage();
    if (post_in != null && post_in != undefined) {
      if (post_in.id == null) {
        post_in.postId = 1;
        post_in.id = this.PostData.length + 1;
        this.PostData.push(post_in);
        window.localStorage.setItem('PostData', JSON.stringify(this.PostData));
        return Observable.of(true);
      }
      else {
        var update_post: Post = this.PostData.filter(post => post.id == post_in.id)[0];
        if (update_post != undefined) {
          update_post.name = post_in.name;
          update_post.email = post_in.email;
          update_post.body = post_in.body;
          window.localStorage.setItem('PostData', JSON.stringify(this.PostData));
          return Observable.of(true);
        } else {
          return Observable.of(false);
        }
      }
    }
    else {
      return Observable.of(false);
    }
  }
  // #endregion
} 
