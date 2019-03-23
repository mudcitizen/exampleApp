import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { MODES, SharedState } from "./sharedState.model";
import { SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { map } from "rxjs/operators";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean;
    constructor(private model: Model,
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>
    ) {
        stateEvents
            .pipe(
                map((state : SharedState) :number => state.mode == MODES.EDIT ? state.id : -1)
                )
            .pipe(distinctUntilChanged())
            .pipe(filter((value :number) => value != 3))
            .subscribe((value:number) => {
                this.editing = value != -1;
                this.product = new Product();
                if (value != -1)
                {
                    Object.assign(this.product,this.model.getProduct(value));
                }
            });
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.product = new Product();
            form.reset();
        }
    }
    resetForm() {
        this.product = new Product();
    }
}