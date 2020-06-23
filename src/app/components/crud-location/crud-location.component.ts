import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crud-location',
  templateUrl: './crud-location.component.html',
  styleUrls: ['./crud-location.component.css']
})
export class CrudLocationComponent implements OnInit {

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
