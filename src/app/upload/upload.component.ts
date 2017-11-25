import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  handleFileSelect = evt => {
    const files = evt.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event){
      const csvData = _.get(event.target, 'result');
      const allTextLines = csvData.split(/\r\n|\n/);
      const headers = allTextLines[0].split(',');
      let lines = [];
  
      for ( let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          let tarr = [];
          for ( let j = 0; j < headers.length; j++ ) {
            tarr.push(data[j]);
          }
          lines.push(tarr);
        }
      }
      console.log(headers);
      console.log(lines);
    }
  }

}
