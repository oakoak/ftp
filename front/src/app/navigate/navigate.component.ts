import { Component } from '@angular/core';
import {files, FilesService} from '../files.service'

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  toHomeFolder() {
    files.changeFolder(0);
  }

}
