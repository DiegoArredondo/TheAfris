import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Output()
  resp = new EventEmitter<boolean>();

  @Input()
  message: String;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(goto) {
    this.router.navigate([goto]);
  }

  emitResponse(b:boolean){
    this.resp.emit(b)
  }

}
