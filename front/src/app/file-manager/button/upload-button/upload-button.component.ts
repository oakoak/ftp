import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FilesService} from '../../files.service'


import prettyBytes from 'pretty-bytes';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
})
export class UploadButtonComponent {
  constructor(public dialog: MatDialog) {}
  fileList: FileList | null | undefined;

  changeInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.fileList = element.files;

    const dialogRef = this.dialog.open(DialogUploadButton, {data : {
      fileList: this.fileList
    }});
  }
}

@Component({
  selector: 'dialog-upload-button',
  templateUrl: 'dialog-upload-button.html',
})
export class DialogUploadButton {
  prettyBytes = prettyBytes;
  fileArray: File[];
  constructor(
    public dialogRef: MatDialogRef<DialogUploadButton>,
    @Inject(MAT_DIALOG_DATA) public data: {fileList: FileList},
    private fileService : FilesService,
    private toastr: ToastrService,
  ) {
    this.fileArray = Array.from(this.data.fileList)
  }

  upload(files : File[]) {
    for (let file of files) {
      console.log(file)
      let a =this.fileService.uploadFile(file)
      a.subscribe(v => {
        this.toastr.success(v["message"],'Upload files')
      })
    }
    this.fileService.changeFolder(this.fileService.path$.value)
    this.dialogRef.close()
  }
}
