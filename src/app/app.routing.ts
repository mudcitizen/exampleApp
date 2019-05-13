import { Routes, RouterModule } from "@angular/router";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { NotFoundComponent } from "./core/notFound.component";
import { ProductCountComponent } from "./core/productCount.component";
import { CategoryCountComponent } from "./core/categoryCount.component";
import { ModelResolver } from "./model/model.resolver";

const childRoutes: Routes = [
    {
        path: "",
        children: [{ path: "products", component: ProductCountComponent },
        { path: "categories", component: CategoryCountComponent },
        { path: "", component: ProductCountComponent }],
        resolve: { model: ModelResolver }
    }];

// here we see the url / component pairs
const routes: Routes = [
    { path: "form/:mode/:id", component: FormComponent,  resolve: { model: ModelResolver } },
    { path: "form/:mode", component: FormComponent, resolve: { model: ModelResolver } },
    { path: "table", component: TableComponent, children: childRoutes },
    { path: "table/:category", component: TableComponent, children: childRoutes },
    { path: "", redirectTo: "/table", pathMatch: "full" },
    { path: "**", component: NotFoundComponent }
]
// RouterModule.forRoot() creates a Module
export const routing = RouterModule.forRoot(routes, { enableTracing: false });