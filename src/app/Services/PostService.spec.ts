import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { debug } from 'util';
import { Post } from "./../Models/Post";
import { element } from 'protractor';

import { TestBed, inject } from '@angular/core/testing';
import { PostService } from './PostService';
import { observeOn } from 'rxjs/operators/observeOn';

describe('PostService', () => {
  let service: PostService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService]
    });
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    service = TestBed.get(PostService);

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should create the service',
    () => {
      expect(service).toBeTruthy();
    });
  it('should get all data from localStorage',
    () => {
      var posts: Observable<Post[]> = 
      service.getAlldata();
      
    });
  it('should return all stored data from localStorage',
    () => {
      var posts: Post[] = [{
        "postId": 1,
        "id": 1,
        "name": "test",
        "email": "test",
        "body": "test"
      }];
      localStorage.setItem('PostData', JSON.stringify(posts));
      expect(service.getAlldata()).toEqual(Observable.of(posts));
    });
  it('should add new data to localStorage',
    () => {
      var newpost: Post = {
        "postId": 1,
        "id": null,
        "name": "test",
        "email": "test",
        "body": "test"
      };
      localStorage.clear();
      service.SavePostData(newpost).subscribe((data: boolean) => {
        expect(data).toBeTruthy();
      });
    });
  it('should update data in localStorage',
    () => {
      var posts: Post[] = [{
        "postId": 1,
        "id": 1,
        "name": "test",
        "email": "test",
        "body": "test"
      }];
      var updatepost: Post = {
        "postId": 1,
        "id": 1,
        "name": "new test",
        "email": "test",
        "body": "test"
      };
      localStorage.clear();
      localStorage.setItem('PostData', JSON.stringify(posts));
      service.SavePostData(updatepost).subscribe((data: boolean) => {
        expect(data).toBeTruthy();
      });
    });
    it('should return false for undefined data save request',
    () => {
      service.SavePostData(undefined).subscribe((data: boolean) => {
        expect(data).toBeFalsy();
      });
    });
    it('should return false for if update data is not present in the local storage',
      () => {
          var posts: Post[] = [{
            "postId": 1,
            "id": 1,
            "name": "test",
            "email": "test",
            "body": "test"
          }];
          var updatepost: Post = {
            "postId": 1,
            "id": 45,
            "name": "new test",
            "email": "test",
            "body": "test"
          };
          localStorage.clear();
          localStorage.setItem('PostData', JSON.stringify(posts));
          service.SavePostData(undefined).subscribe((data: boolean) => {
            expect(data).toBeFalsy();
          });
    });

  it('should delete data from localStorage',
    () => {
      var posts: Post[] = [{
        "postId": 1,
        "id": 1,
        "name": "test",
        "email": "test",
        "body": "test"
      }];
      localStorage.setItem('PostData', JSON.stringify(posts));
      var postDatabeforedelete: Post[] = service.readPostDataFromLocalStorage();
      expect(postDatabeforedelete).toContain(posts[0]);
      service.deletePostData(posts[0]);
      var postDataafterdelete: Post[] = service.readPostDataFromLocalStorage();
      expect(postDataafterdelete).not.toContain(posts[0]);
    });
});


