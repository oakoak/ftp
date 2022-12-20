import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { File } from './file'

import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

import {HOME, Helium} from './mock-files'

@Injectable({
  providedIn: 'root'
})

export class FilesService {
  private filesUrl = 'http://localhost:8080/files';  // URL to web api
  path:BehaviorSubject<string>;
  files:BehaviorSubject<File[]>;


  getFiles(path:string){
    const url = `${this.filesUrl}?path=${path}`;
    return  this.http.get<File[]>(url).subscribe(v => {
      this.files.next(v)
      this.path.next(path)
    });
  }

  constructor(private http:HttpClient) {
    this.path = new BehaviorSubject<string>('/home')

    this.files = new BehaviorSubject<File[]>([])

    this.changeFolder('/home')
  }

  changeFolder(path: string | undefined) {
    if (path) {
      this.getFiles(path);
    }
  }
}
