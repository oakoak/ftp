import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { File } from './file'

import {HOME, Helium} from './mock-files'

@Injectable({
  providedIn: 'root'
})


export class FilesService {
  currentFolderId:number | undefined;
  currentFiles:File[];
  subject:Subject<number>;

  constructor() {
    this.currentFolderId = 0;
    this.currentFiles = HOME;
    this.subject = new Subject<number>()
  }

  changeFolder(folderId: number | undefined) {
    if (this.currentFolderId == folderId)
      return;
    if (folderId == 0) {
      this.currentFiles = HOME;
    } else {
      this.currentFiles = Helium;
    }
    this.currentFolderId = folderId;
    this.subject.next(0)
  }
}

export var files = new FilesService();
