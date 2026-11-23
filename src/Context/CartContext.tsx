import { AddProductToCartAction } from '@/CartAction/AddProductCart'
import { clearCartAction } from '@/CartAction/clearCart'
import { getUserCartAction } from '@/CartAction/getUserCart'
import { deleteCartItemAction } from '@/CartAction/removeCartItem'
import { updateCartCountAction } from '@/CartAction/updateCartCount'
import { Cart } from '@/types/cart.t'
import React, { useEffect, useState, createContext } from 'react'
import { useSession } from "next-auth/react";
type CartContextType = {
  products: Cart["data"]["products"];
  totalCartPrice: number;
  totalCartItem: number;
  isLoading: boolean;
  cartId: string;
  addProductCart: (id: string) => Promise<any>;
  deleteCartItem: (id: string) => Promise<any>;
  clearCart: () => Promise<any>;
  updateCartCount: (id: string, count: number) => Promise<any>;
  afterPayment: () => void;
};

export const cartContext = createContext({} as CartContextType);
const CartContextProvider = ({children}:{children:React.ReactNode}) => {

    const [products, setProducts] = useState<Cart["data"]["products"]>([]);
    const [totalCartPrice,setTotalCartPrice]=useState(0)
    const [totalCartItem,setTotalCartItem]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const [cartId,setCartId]=useState("")
    const { data: session, status } = useSession();

async function getUserCart(){
  setIsLoading(true)
        try{
         const data:Cart=await getUserCartAction()
         setProducts(data.data.products)
         setTotalCartPrice(data.data.totalCartPrice)
         setTotalCartItem(data.numOfCartItems)
       setIsLoading(false)
       setCartId(data.cartId)
        }catch(error){
         console.log(error)
                setIsLoading(false)

        }
    }

  async function addProductCart(id:string){
    try{
    const data=await AddProductToCartAction(id)
     setProducts(data.data.products)
         setTotalCartPrice(data.data.totalCartPrice)
         setTotalCartItem(data.numOfCartItems)
                setCartId(data.cartId)

      return data
    }catch(error){
     console.log(error) 
    }
  }  


  async function deleteCartItem(id:string){
    try{
    const data=await deleteCartItemAction(id)
     setProducts(data.data.products)
         setTotalCartPrice(data.data.totalCartPrice)
         setTotalCartItem(data.numOfCartItems)
                setCartId(data.cartId)

      return data
    }catch(error){
     console.log(error) 
    }
  }  


   async function clearCart(){
    try{
    const data=await clearCartAction()
         setProducts(data.data.products)
         setTotalCartPrice(data.data.totalCartPrice)
         setTotalCartItem(data.numOfCartItems)
                setCartId("")

      return data
    }catch(error){
     console.log(error) 
    }
  }  

  async function updateCartCount(id:string,count:number){
    try{
    const data=await updateCartCountAction(id,count)
     setProducts(data.data.products)
         setTotalCartPrice(data.data.totalCartPrice)
         setTotalCartItem(data.numOfCartItems)
                setCartId(data.cartId)

      return data
    }catch(error){
     console.log(error) 
    }
  }  


  function afterPayment(){
     setProducts([])
         setTotalCartPrice(0)
         setTotalCartItem(0)
            setCartId("")

  }

  
    useEffect(() => {
  if (status === "authenticated") {
    getUserCart();
  }

  if (status === "unauthenticated") {
    setProducts([]);
    setTotalCartPrice(0);
    setTotalCartItem(0);
    setCartId("");
  }
}, [status]);
  return (
    <cartContext.Provider value={
        {
         products,
         totalCartPrice,
         totalCartItem,
         addProductCart,
         isLoading,
         deleteCartItem,
         updateCartCount,
         clearCart,
         cartId,
         afterPayment
        }
    }>
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider 
