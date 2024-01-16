import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-tagged-img-popup',
  templateUrl: './tagged-img-popup.component.html',
  styleUrls: ['./tagged-img-popup.component.css']
})
export class TaggedImgPopupComponent implements OnInit {

  @Input() data;
  options = {
    init(img) {
      img.crossOrigin = 'anonymous';
    },
  };
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
console.log(this.data);
    // let textMark ="Lat: " + this.data.record.latitude +"  Long: "+ this.data.record.longitude +" Address: "+ this.data.record.address;  
    let textMark = this.data.record.address;  
     watermark([this.data.img],this.options)

    .image(watermark.text.lowerRight(textMark,"14px serif","#20fa41", 0 ))
    .then((img) => {
      document.getElementById('container').appendChild(img);
    });
  
  }

}
