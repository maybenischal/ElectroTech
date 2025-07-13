import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

interface ListProductsProps {
  token: string;
}
const ListProducts = ({ token }: ListProductsProps) => {
  console.log("Token:", token);

  const [list, setList] = useState([])
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + 'api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <><p>ALL Product List</p></>
  )
}

export default ListProducts