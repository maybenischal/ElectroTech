import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

interface ListProductsProps {
  token: string;
}

interface Product {
  _id: string;
  name: string;
  type: string;
  brand: string;
  image: string;
  price: number;
}

const ListProducts = ({ token }: ListProductsProps) => {

  const [list, setList] = useState<Product[]>([])
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token }
      })
      console.log("Response:", response.data);
      setList(response.data.products);
      console.log("List state set:", response.data.products);
    }
    catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id: string) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, {
        headers: { token }
      })
      if (response.data.success) {
        await fetchList()
        console.log(response.data.message)
        toast.success("Product has been deleted")
      } else {
        console.log(response.data.message)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">ALL Product List</p>
      <div className="flex flex-col gap-2">

        {/*List Table View*/}
        <div className="md:grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Type</b>
          <b>Brand</b>
          <b>Image</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) => {
          console.log("Image URL:", item.image[0]);
          console.log("Full URL:", backendUrl + item.image[0]);
          return (
            <div key={index} className="md:grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm">
              <p>{item.name}</p>
              <p>{item.type}</p>
              <p>{item.brand}</p>
              <img src={item.image} className="h-10 w-20 object-cover" />
              <p>{item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                🗑️ Delete
              </button>
            </div>
          )
        })}
      </div>
    </>

  )
}

export default ListProducts