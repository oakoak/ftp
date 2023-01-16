import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';

import { MatTableModule } from '@angular/material/table';
import { FilesListComponent } from './files-list/files-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigateComponent } from './navigate/navigate.component';
import {
  DialogUploadButton,
  UploadButtonComponent
} from './button/upload-button/upload-button.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {DialogMoveButton, MoveButtonComponent} from './button/move-button/move-button.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    FileManagerComponent,
    FilesListComponent,
    ButtonComponent,
    NavigateComponent,
    UploadButtonComponent,
    DialogUploadButton,
    MoveButtonComponent,
    DialogMoveButton,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
  ]
})
export class FileManagerModule { }
