import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, CartData, OrderModel } from '../../model/products';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {
masterService=inject(MasterService)
cartData:CartData[]=[];
totalAmount:number=0;
orderObj:OrderModel=new OrderModel();
ngOnInit(): void {
  this.getCartItems();
}
getCartItems(){
  this.masterService.GetCartProductsByCustomerId(this.masterService.logedUserData.custId).subscribe((res:ApiResponseModel)=>{
  this.cartData=res.data;
  this.cartData.forEach(element => {
    this.totalAmount=this.totalAmount + element.productPrice;
  });
  })
}
placeOrder(){
  debugger;
  this.orderObj.CustId=this.masterService.logedUserData.custId;
  this.orderObj.TotalInvoiceAmount=this.totalAmount;
  this.masterService.placeOrder(this.orderObj).subscribe((res:ApiResponseModel)=>{
  if(res.result){
    alert("Order Placed Successfully..!");
    this.getCartItems();
    this.orderObj=new OrderModel();
  }else{
    alert(res.message)
  }
  })
}
}
