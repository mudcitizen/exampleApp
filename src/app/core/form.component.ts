import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { MODES, SharedState } from "./sharedState.model";
import { SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router"; 

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean;
    constructor(private model: Model,  activeRoute: ActivatedRoute)
     {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        let id = activeRoute.snapshot.params["id"];
        if (id != null) {
            Object.assign(this.product, model.getProduct(id) || new Product());
        }
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