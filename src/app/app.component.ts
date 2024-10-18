import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabulatorGridComponent } from "./components/tabulator.component";
import { Product } from './shareds/models/Product';
import { ProductService } from './shareds/product.service';
import { TabulatorService } from './shareds/tabulator.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabulatorGridComponent],
  providers: [{ provide: TabulatorService, useClass: TabulatorService }, HttpClient, { provide: ProductService, useClass: ProductService }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy  {
  productService = inject(ProductService);
  tabulatorService = inject(TabulatorService);

  products$ = this.productService.GetProductsObservable();
  products: Product[] = []
  subs = new Subscription();

  columns = [
    { title: "Id", field: "id", width: 150 },
    { title: "Titulo", field: "title", width: 150 },
  ];
  currentPage: number = 1;
  title = 'angular-tabulator';



  constructor() {
   const subProduct =  this.products$.subscribe(produtos => {
      this.products = produtos;
      this.tabulatorService.setData(produtos);
    })

    this.subs.add(subProduct);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  getCurrentPageTabulator() {
    this.currentPage = this.tabulatorService.getCurrentPageTable();
    alert("Paggina atual é "+this.currentPage)

  }

  async setPageTabulator() {
    await this.tabulatorService.setCurrentPage(2);
  }


  async GetAllProducts() {
    await this.productService.GetAllProducts();

  }




}
