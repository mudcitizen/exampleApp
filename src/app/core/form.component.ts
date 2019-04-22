import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { MODES } from "./sharedState.model";
import { SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean;
    constructor(private model: Model, activeRoute: ActivatedRoute, private router: Router) {
        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        activeRoute.params.subscribe(params => this.setProduct(params['id']))
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            /*
            the following change is not related the 
            the change for routing...   This component
            used to live next to the TableComponent and
            needed to "clean up" after saveProduct (because
            it did not get destroyed).  Now it get destroyed
            when we navigate back to the TableComponent...
            this.product = new Product();
            form.reset();
            */
            this.router.navigateByUrl("/");
        }
    }
    resetForm() {
        this.product = new Product();
    }

    private setProduct(id:number) {
        if (id != null) {
            Object.assign(this.product, this.model.getProduct(id) || new Product());
        }
    }
}