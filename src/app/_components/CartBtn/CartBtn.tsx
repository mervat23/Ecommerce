"use client"
import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext'
import { useContext } from 'react'
import { toast } from 'sonner'
import { Plus } from "lucide-react"


const CartBtn = ({id}:{id:string}) => {
  const { addProductCart } = useContext<any>(cartContext)

  async function addProductToCart(){
      const data = await addProductCart(id)

      if(data.status==="success"){
        toast.success(data.message,{
        position:"top-center"    
        })
      }else{
        toast.error(
        "product added failed to your cart",{
         position:"top-center"   
        })
      }
    }


  return (
    <div>
<Button
  onClick={addProductToCart}
  aria-label="Add to cart"
  className="shrink-0 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition"
>
  <Plus size={22} />
</Button>
    </div>
  )
}

export default CartBtn
