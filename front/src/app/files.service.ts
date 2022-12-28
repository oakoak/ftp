import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { myFile } from './myFile'

import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';

import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})

export class FilesService {
  private baseApiUrl = 'http://localhost:8080';  // URL to web api
  path$:BehaviorSubject<string>;
  files$:BehaviorSubject<myFile[]>;

  getFiles(path:string){
    let httpParams = new HttpParams().set('path', path)

    return  this.http.get<myFile[]>(`${this.baseApiUrl}/folder`, {params:httpParams}).subscribe(v => {
      for (let i of v) {
        i.createdTime = new Date(String(i.createdTime));
      }
      this.files$.next(v)
      this.path$.next(path)
    });
  }

  constructor(private http:HttpClient) {
    this.path$ = new BehaviorSubject<string>('')
    this.files$ = new BehaviorSubject<myFile[]>([])

    this.changeFolder('/home')
  }

  changeFolder(path: string | undefined) {
    if (path) {
      this.getFiles(path);
    }
  }

  loadFile(fileName: string | undefined) {
    if (fileName){
      saveAs(`${this.baseApiUrl}/file?path=${fileName}`, fileName.split("/").slice(-1)[0]);
    }
  }

  uploadFile(file: File):Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name,);
    formData.append('path', this.path$.value)
    return this.http.post(`${this.baseApiUrl}/file`, formData)
  }
}
