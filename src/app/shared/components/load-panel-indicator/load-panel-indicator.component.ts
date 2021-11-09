import { Component, Input, NgModule, OnInit } from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular';

@Component({
  selector: 'app-load-panel-indicator',
  templateUrl: './load-panel-indicator.component.html',
  styleUrls: ['./load-panel-indicator.component.scss']
})
export class LoadPanelIndicatorComponent implements OnInit {
  @Input() visible: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    LoadPanelIndicatorComponent
  ],
  imports: [
    DxLoadPanelModule
  ],
  exports: [
    LoadPanelIndicatorComponent
  ]
})
export class LoadPanelIndicatorModule { }

