import {AfterViewInit, Component, Output, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import prettyBytes from 'pretty-bytes';

import {File} from "../file"
import {FilesService} from "../files.service"
import {BehaviorSubject, Observable} from "rxjs";



@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<File>;
  dataSource = new MatTableDataSource(this.files.files$.value);
  prettyBytes = prettyBytes;
  mapIconType: Record<string, string> = {
    "pdf":"picture_as_pdf",
    "doc":"description",
    "docx":"description"
  }


  displayedColumns = ['select', 'type', 'name', 'size', 'createdTime'];
  selection = new SelectionModel<File>(true, []);

  constructor(private files: FilesService) {
    this.files.files$.subscribe((dataFiles) => {
      this.dataSource.data = dataFiles
      this.selection.clear()
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openFile(row: File) {
    if (row.isFolder){
      this.files.changeFolder(row.path);
    }
  }
}


