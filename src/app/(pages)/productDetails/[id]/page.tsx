import { getSingleProduct } from "@/apis/product";
import CartBtn from "@/app/_components/CartBtn/CartBtn";
import { Product } from "@/types/product.t";
import { IoIosStar } from "react-icons/io";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id }: { id: string } = await params;
  const data: Product = await getSingleProduct(id);
  return (
    <div className="my-12 w-full md:w-[90%] px-5">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4">
          <div>
            <img src={data?.imageCover} alt="" className="w-full" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="p-5">
            <h1 className="text-4xl mb-5 text-green-500">{data?.title}</h1>
            <p className="text-lg mb-5">{data?.description}</p>
            <p>
              <IoIosStar className="text-yellow-500 inline" />
              {data?.ratingsAverage}
            </p>

            <CartBtn id={data?.id}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
