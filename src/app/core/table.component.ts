import { Component, Inject } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { Observer } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "paTable",
    templateUrl: "table.component.html"
})
export class TableComponent {

    private category: string;
    constructor(private model: Model, activeRoute: ActivatedRoute) {
        activeRoute.params.subscribe(params => {
            this.category = params["category"] || null;
        })
    } getProduct(key: number): Product {
        return this.model.getProduct(key);
    }
    getProducts(): Product[] {
        return this.model.getProducts()
            .filter(p => this.category == null || p.category == this.category);
    }

    get categories(): string[] {
        return this.model.getProducts()
            .map(p => p.category)
            /* 
            array.indexOf(category) returns the index of the 1st occurance. So
            only the 1st occurances "pass" the filter
            */ 
            .filter((category, index, array) => array.indexOf(category) == index);
    }
    deleteProduct(key: number) {
        this.model.deleteProduct(key);
    }
}