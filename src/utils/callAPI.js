import {API_URL} from "../config/index.js"


const callapi = (uri, method="GET",data)=>{
    return axios ({
        url:API_URL+uri,
        method,
        data,
    })
}



const getListProductService = () =>{
    return axios({
        url:"https://5f5c7a3a5e3a4d0016249448.mockapi.io/api/Schema",
        method:"GET",
    })
}
const getItemService = (id) =>{
    return axios({
        url:`https://5f5c7a3a5e3a4d0016249448.mockapi.io/api/Schema/${id}`,
        method:"GET",
    })
}
const updateItemService = (item) =>{
    return axios({
        url:`https://5f5c7a3a5e3a4d0016249448.mockapi.io/api/Schema/${item.id}`,
        method:"PUT",
        data:item
    })
}
const deleteProductService = (id) =>{
    return axios ({
        url:`https://5f5c7a3a5e3a4d0016249448.mockapi.io/api/Schema/${id}`,
        method:"DELETE",
    })
}

const addProductService = (item) =>{
    return axios ({
        url:`https://5f5c7a3a5e3a4d0016249448.mockapi.io/api/Schema`,
        method:"POST",
        data:item,
    })
}

export { getListProductService,deleteProductService,addProductService,getItemService,updateItemService,callapi};