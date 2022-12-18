import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

/*
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
      if (item.link) {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', item.link);
        link.setAttribute('download', item.name + '.' + item.type);
        link.click();
        link.remove();
      }
    }
  }*/

}
