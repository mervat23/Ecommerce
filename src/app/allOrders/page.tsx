import Image from 'next/image'
import { getAllOrdersAction } from '@/PaymentAction/Order'
import {Order } from '@/types/orders.t'
export const instant = false



const AllOrders = async() => {

  const data:Order[]=await getAllOrdersAction()
  return (
    <div className='my-12 w-full md:w-[90%] mx-auto p-5'>
      {data?.map(function(order:Order,idex:number){return <div key={idex} className='p-4 mb-5 bg-slate-50'>
           
    <div className='grid grid-cols-12'>
        {order.cartItems?.map(function(item, index){
            return <div key={index} className='col-span-12 md:col-span-4 lg:col-span-3'>
                <Image src={item.product.imageCover} alt="" width={200} height={200} />
                <h3>{item.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                
            </div>
        })}
    </div>

      <h3>payment Method Type:{order.paymentMethodType}</h3>
      <h3>total Order Price:{order.totalOrderPrice}</h3>
      </div>
    
    })}
   
   
    </div>
  )
}

export default AllOrders
