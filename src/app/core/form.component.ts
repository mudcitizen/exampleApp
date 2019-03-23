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
            .pipe(distinctUntilChanged((firstState,secondState)  => firstState.mode == secondState.mode && firstState.id == secondState.id
            ))
            .pipe(filter((state : SharedState) => state.id != 3))
            .subscribe((state : SharedState) => {
                this.editing = state.mode == MODES.EDIT;
                this.product = new Product();
                if (state.id != undefined)
                {
                    Object.assign(this.product,this.model.getProduct(state.id));
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