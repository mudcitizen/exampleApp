import { Routes, RouterModule } from "@angular/router";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { NotFoundComponent } from "./core/notFound.component"; 

// here we see the url / component pairs
const routes: Routes = [
    { path: "form/:mode/:id", component: FormComponent },
    { path: "form/:mode", component: FormComponent },
    { path: "", component: TableComponent },
    { path: "**", component: NotFoundComponent}
]

// RouterModule.forRoot() creates a Module
export const routing = RouterModule.forRoot(routes);