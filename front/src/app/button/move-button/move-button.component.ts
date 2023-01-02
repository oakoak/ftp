import {Component, Inject, Input} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {myFile} from "../../myFile";
import {FilesService} from "../../files.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToasterService} from "../../toaster/toaster.service";

@Component({
  selector: 'app-move-button',
  templateUrl: './move-button.component.html',
  styleUrls: ['./move-button.component.css']
})
export class MoveButtonComponent {
  @Input() selection: SelectionModel<myFile> | undefined;

  constructor(private files: FilesService,
              public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogMoveButton, {
      width: '600px', data: {selection : this.selection?.selected}
    })
  }
}



@Component({
  selector: 'dialog-move-button',
  templateUrl: 'dialog-move-button.html',
})
export class DialogMoveButton {
  currentFolder: string | undefined;
  folders: myFile[] | undefined;
  splitsPath: string[]
  constructor(
    public dialogRef: MatDialogRef<DialogMoveButton>,
    @Inject(MAT_DIALOG_DATA) public data: {selection: myFile[]},
    private fileService : FilesService,
    private toaster: ToasterService
  ) {
    this.splitsPath = []
    this.currentFolder = this.fileService.path$.value
    this.folders = this.fileService.files$.value.filter(file => file.isFolder)
    this.splitsPath = this.currentFolder.split('/').filter(value => value)
  }

  toFolder(folder:string | undefined) {
    if (!folder) return;
    this.fileService.getFiles(folder).subscribe(
      value => {
        let tmpFolders = value.filter(file => file.isFolder)
        if (tmpFolders.length > 0) {
          this.folders = tmpFolders
          this.currentFolder = folder
          this.splitsPath = this.currentFolder.split('/').filter(value => value)
        }
      }
    )
  }

  moveselected (target:any ) {
    if (!target) return
    let i = target[0]
    if (i && this.fileService.path$.value != i.path && i.path) {
      for (let row of this.data.selection) {
        if (!row.isFolder && row.path) {
          this.fileService.moveFile(row.path, i.path + '/' + row.name).subscribe(v =>
          {
            this.toaster.show("success", "moving files" , v["message"] , 10000)
            console.log(v)
          });
        }
      }
    }
    this.fileService.changeFolder(this.fileService.path$.value);
    this.dialogRef.close()
  }
}
