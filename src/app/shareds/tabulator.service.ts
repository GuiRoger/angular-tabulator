import { Inject } from "@angular/core";
import { Options, TabulatorFull as Tabulator } from "tabulator-tables";


Inject({
  provideIn: "root"
})
export class TabulatorService {

  table?: Tabulator;
  options?:Options ;

  public configureTable(tableData: any, columnNames: any, height: any){
    this.options = {
      pagination:true,
      paginationMode: "local",
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 30, 50],
      data: tableData,
      columns: columnNames,

    };
  }

  public drawTable(tab: any, ): void {
    this.table = new Tabulator(tab, this.options);
    document.getElementById('tabular-grid')?.appendChild(tab);
  }

  getCurrentPageTable(): number {
    const page = this.table?.getPage();
    console.log(page)
    if (page !== false)
      return page!;
    else
      return 0;
  }

  async setCurrentPage(pageNumber:number):Promise<void>{
    await this.table?.setPage(pageNumber);
  }

  async setData(data:any){
    await this.table?.updateData(data);
  }


}

