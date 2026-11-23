
export interface Order {
  _id: string;
   shippingAddress:ShippingAddress,
   shippingPrice:number,
   totalOrderPrice:number,
   paymentMethodType:string,
   isPaid:boolean,
   isDelivered:boolean,
   user:User,
   cartItems:CartItem[]
  taxPrice: number;
  createdAt: string
  updatedAt: string;
  id: number,
  __v: number
  paidAt?:string
}

export interface ShippingAddress{
    details:string,
    phone:string,
    city:string
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
export interface CartItem {
  _id: string;
 count:number
 product:Product
 price:number
}

export interface Product {
  _id: string;
  category: Category;
  subcategory: Subcategory;
  ratingsQuantity: number;
  title: string;
  imageCover: string;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}


export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
