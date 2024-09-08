import { Component, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { addToCart, ApiResponseModel, Category, Customer, ProductList } from '../../model/products';
import { CommonModule } from '@angular/common';
import { map, Observable, Subscription } from 'rxjs';
import { Constant } from '../../Const/const';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{
productList:ProductList[]=[];
// productList = signal<ProductList[]>([]); for using signal
categoryList$:Observable<Category[]> = new Observable<Category[]>();
subscriptionList: Subscription[]=[];

masterService = inject(MasterService)
  logedUserData: any;
// constructor(private masterService:MasterService){}
constructor(){
}
  ngOnInit():void{
    this.loadAllProducts();
    this.categoryList$ = this.masterService.getAllCategory().pipe(
      map(item=>item.data)
    )
  }
  getProductByCategory(id:number){
    this.masterService.getProductsByCategory(id).subscribe((res:ApiResponseModel)=>{
      this.productList=res.data;
    })
  }
  
loadAllProducts(){
this.subscriptionList.push(this.masterService.getAllProducts().subscribe((res:ApiResponseModel)=>{
this.productList=res.data;
// this.productList.set(res.data)  for using signal
}))
}
clickToAdd(id:number){
  debugger;
  const newObj:addToCart= new addToCart();
  newObj.ProductId=id;
  if (this.masterService.logedUserData && this.masterService.logedUserData.custId){
  newObj.CustId=this.masterService.logedUserData.custId;
  // if (this.logedUserData && this.logedUserData.custId) {
  //   newObj.CustId = this.logedUserData.custId;
  } else {
    alert('Customer ID not found! Please log in.');
    return; // Stop the process if no CustId is available
  }

  console.log('Add to Cart Payload:', newObj);
  this.masterService.addToCartDetails(newObj).subscribe((res:ApiResponseModel)=>{
    if(res.result){
      alert("product add to cart")
      this.masterService.onCartAdded.next(true)
    }else{
      alert(res.message)
    }
  })
}
ngOnDestroy(): void {
  this.subscriptionList.forEach(element => {
    element.unsubscribe()
  });
}
}
