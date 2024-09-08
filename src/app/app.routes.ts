import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { MyOrderComponent } from './Components/my-order/my-order.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:ProductsComponent
    },
    {
        path:'create-order',
        component:CreateOrderComponent
    },
    {
        path:'my-order',
        component:MyOrderComponent
    }
];
