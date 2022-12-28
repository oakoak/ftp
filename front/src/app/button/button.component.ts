import {Component, EventEmitter, Input} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {myFile} from "../myFile";
import {FilesService} from "../files.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() selection: SelectionModel<myFile> | undefined;

  constructor(private files: FilesService) {}

    downloadselected () {
    if (this.selection)
    for (let row of this.selection.selected) {
      if (!row.isFolder) {
        this.files.loadFile(row.path)
      }
    }
  }
}
