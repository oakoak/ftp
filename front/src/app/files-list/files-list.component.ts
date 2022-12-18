import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {SelectionModel} from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { Renderer2 } from '@angular/core'
import {Time} from "@angular/common";
import {File} from "../file"
import {files, FilesService} from "../files.service"



@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<File>;
  files = files;
  dataSource = new MatTableDataSource(this.files.currentFiles);


  displayedColumns = ['select', 'id', 'type', 'name', 'owner'];
  selection = new SelectionModel<File>(true, []);

  constructor() {
    this.files.subject.subscribe((i) => {
      this.dataSource.data = this.files.currentFiles
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
    if (row.type == 'folder')
      this.files.changeFolder(row.id);
  }
}


