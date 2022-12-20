import { Component } from '@angular/core';
import {FilesService} from '../files.service'

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  path: string | undefined
  constructor(private files: FilesService) {
    this.files.path.subscribe(value => this.path = value)
  }
  toHomeFolder() {
    this.files.changeFolder('/home');
  }

}
