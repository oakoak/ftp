import { Component } from '@angular/core';
import {FilesService} from '../files.service'

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  path: string | undefined
  splitPath: string[] | undefined;

  constructor(private files: FilesService) {
    this.files.path.subscribe(value => {
      this.path = value
      this.splitPath = this.path.replace(/^\/home/,"")
        .replace(/\//, "").split("/")
    })
  }

  toHomeFolder() {
    this.files.changeFolder('/home');
  }

  toFolder(i: number) {
    console.log(i)
    this.files.changeFolder("/home/" + this.splitPath?.slice(0, i + 1).join("/"))
  }
}
