import { Component, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TabulatorService } from "../shareds/tabulator.service";




@Component({
  selector: 'app-tabulator',
  standalone: true,
  providers: [TabulatorService],
  styleUrls: ['./tabulator.component.scss'],
  template: `  <div id="tabular-grid"></div>  `,
})
export class TabulatorGridComponent implements OnChanges {

  tabulatorService = inject(TabulatorService);

  @Input() tableData: any[] = [];
  @Input() columnNames: any[] = [];
  @Input() height: string = '311px';

  tab = document.createElement('div');



  ngOnChanges(changes: SimpleChanges): void {
    this.tabulatorService.configureTable(this.tableData, this.columnNames, this.height);
    this.tabulatorService.drawTable(this.tab);
  }
}
