import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FilesListDataSource, FilesListItem } from './files-list-datasource';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {SelectionModel} from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { Renderer2 } from '@angular/core'



@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FilesListItem>;
  dataSource: FilesListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'type', 'name', 'owner'];
  selection = new SelectionModel<FilesListItem>(true, []);



  constructor() {
    this.dataSource = new FilesListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }

    deleteOne = new EventEmitter<any>();
    delete($event: MouseEvent){
      console.log('Working delete');
      let a = '';
      for (let item of this.selection.selected) {
        console.log(item.id);
        a += item.name + ' '
      }

      console.log('You wanted delete ' + a)

    }


    downloadOne  = new EventEmitter<any>();
    download($event: MouseEvent){
      for (let item of this.selection.selected) {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', item.link);
        link.setAttribute('download', item.name);
        link.click();
        link.remove();
      }
     }
}


