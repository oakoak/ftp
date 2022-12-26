import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { File } from './file'

import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})

export class FilesService {
  private filesUrl = 'http://10.0.0.33:8080/files';  // URL to web api
  path$:BehaviorSubject<string>;
  files$:BehaviorSubject<File[]>;
//  selectedFiles:BehaviorSubject<File[]>;


  getFiles(path:string){
    const url = `${this.filesUrl}?path=${path}`;
    return  this.http.get<File[]>(url).subscribe(v => {
      for (let i of v) {
        i.createdTime = new Date(String(i.createdTime));
      }
      this.files$.next(v)
      this.path$.next(path)
    });
  }

  constructor(private http:HttpClient) {
    this.path$ = new BehaviorSubject<string>('/home')

    this.files$ = new BehaviorSubject<File[]>([])

    this.changeFolder('/home')
  }

  changeFolder(path: string | undefined) {
    if (path) {
      this.getFiles(path);
    }
  }

  loadFile(fileName: string | undefined) {
    if (fileName){
      saveAs(fileName);
    }
  }

  uploadFile(){

  }
}
