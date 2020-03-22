import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss']
})
export class EventCreationComponent implements OnInit {


  date = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
  }


  _openCalendar(picker: MatDatepicker<Date>) {
    picker.open();
  }
  _openTimer(picker: NgxMaterialTimepickerComponent) {
    picker.open();
  }
}
