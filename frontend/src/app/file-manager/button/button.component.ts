import {Component, Input} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {myFile} from "../myFile";
import {FilesService} from "../files.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() selection: SelectionModel<myFile> | undefined;

  constructor(private files: FilesService,
              private toastr: ToastrService,
              ) {}

    downloadselected () {
    if (this.selection)
    for (let row of this.selection.selected) {
      if (!row.isFolder  && row.path) {
        this.files.loadFile(row.path)
      }
    }
  }

  deleteselected () {
    if (this.selection) {
      for (let row of this.selection.selected) {
        if (!row.isFolder && row.path) {
          this.files.deleteFile(row.path).subscribe(v => {
            this.toastr.success(v["message"],'Deleting files')
            console.log(v)
          })
        }
      }
      this.files.changeFolder(this.files.path$.value);
    }
  }
}
