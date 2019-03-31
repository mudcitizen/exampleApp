import { Routes, RouterModule } from "@angular/router";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";

// here we see the url / component pairs
const routes: Routes = [
    { path: "form/edit", component: FormComponent },
    { path: "form/create", component: FormComponent },
    { path: "", component: TableComponent }]

// RouterModule.forRoot() creates a Module
export const routing = RouterModule.forRoot(routes);