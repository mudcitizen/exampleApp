import {Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef} from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { _document } from "@angular/platform-browser/src/browser";

@Component({
    selector: "paCategoryCount",
    template: `<div class="bg-primary p-2 text-white">
    CategoryCountComponent There are {{count}} categories
               </div>`
})
export class CategoryCountComponent {
    private differ: KeyValueDiffer<any, any>;
    _count: number = 0;
    get count() : number { 
        return this._count;
    }
    set count(c : number ) {
        this._count = c;
    }
    constructor(private model: Model,
        private keyValueDiffers: KeyValueDiffers,
        private changeDetector: ChangeDetectorRef) { }
    ngOnInit() {
        this.differ = this.keyValueDiffers
            .find(this.model.getProducts())
            .create();
    }
    ngDoCheck() {
        if (this.differ.diff(this.model.getProducts()) != null) {
            let ps : Product[] = this.model.getProducts();
            console.log(ps);
            this._count = this.model.getProducts()
                .map(p => p.category)
                .filter((category, index, array) => array.indexOf(category) == index)
                .length;
        }
    }
}