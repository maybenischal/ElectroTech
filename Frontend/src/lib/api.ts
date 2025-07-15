    import axios from "axios"
    import { backendUrl } from "../App"

    export const getProductsData = async() =>{
        try{
            const response = await axios.get(backendUrl + '/api/product/list');     
            console.log(response)
            console.log("hi")
                console.log("List state set:", response.data.products);


        }
        catch(error){
            console.log(error)
        }
    }