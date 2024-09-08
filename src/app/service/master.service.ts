import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { addToCart, ApiResponseModel, Category, Customer, LoginModel, OrderModel } from '../model/products';
import { Constant } from '../Const/const';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  onCartAdded:Subject<boolean>= new Subject<boolean>;
apiUrl:string="https://freeapi.miniprojectideas.com/api/BigBasket/";
logedUserData:Customer=new Customer();
  constructor(private http:HttpClient) { 
    const isUser = localStorage.getItem(Constant.LOCAL_KEY)
    console.log('Stored user in local storage:', isUser);
    if(isUser !=null){
    const parseObj =JSON.parse(isUser)
    this.logedUserData=parseObj
    console.log('Parsed loggedUserData:', this.logedUserData);
    }
  }

  getAllProducts():Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllProducts")
  }
  getAllCategory():Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllCategory")
  }

  getProductsByCategory(categoryId:number):Observable<ApiResponseModel>{
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    // return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllProductsByCategoryId?id"+catetoryId)
    return this.http.get<ApiResponseModel>(url)
  }
addToCartDetails(obj:addToCart){
  // return this.http.post(this.apiUrl+"AddToCart",obj)
  const url = `${this.apiUrl}AddToCart`;
  return this.http.post<ApiResponseModel>(url,obj)
}
  registerCustomer(obj:Customer):Observable<ApiResponseModel>{
    debugger
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<ApiResponseModel>(url,obj)
  }
  loginCustomer(obj:LoginModel):Observable<ApiResponseModel>{
    debugger
    const url = `${this.apiUrl}Login`;
    return this.http.post<ApiResponseModel>(url,obj)
  }
  GetCartProductsByCustomerId(loggedUserId:number):Observable<ApiResponseModel>{
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`;
    // return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllProductsByCategoryId?id"+catetoryId)
    return this.http.get<ApiResponseModel>(url)
  }
  DeleteProductFromCartById(cartId:number):Observable<ApiResponseModel>{
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`;
    // return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllProductsByCategoryId?id"+catetoryId)
    return this.http.get<ApiResponseModel>(url)
  }
  placeOrder(obj:OrderModel):Observable<ApiResponseModel>{
    debugger
    const url = `${this.apiUrl}PlaceOrder`;
    return this.http.post<ApiResponseModel>(url,obj)
  }
}
