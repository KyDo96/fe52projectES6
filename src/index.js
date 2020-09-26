import {getListProductService,deleteProductService,addProductService,getItemService,updateItemService,callapi} from "./utils/callAPI.js";
import Product from "./models/product.js"; 
const renderHTML = () =>{
    const contentHTML = `
    <div class="card text-white bg-dark">
      <div class="card-body">
        <h4 class="card-title">Danh sách sản phẩm</h4>
        <div class='container'>
          <div class="row">
            <div class="col-md-3">
              <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
            </div>
            <div class="col-md-3">
              <input id="tenSP" class="form-control" placeholder="Tên SP" />
            </div>
            <div class="col-md-3">
              <input id="gia" class="form-control" placeholder="Giá" />
            </div>
            <div class="col-md-3">
              <input id="hinhAnh" class="form-control" placeholder="Link hình" />
            </div>
          </div>
          <br />
          <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
          <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
          <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
        </div>
      </div>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên SP</th>
            <th>Giá </th>
            <th>Hình ảnh</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tblDanhSachSanPham">

        </tbody>
      </table>
    </div>
    `
    document.getElementById("root").innerHTML=contentHTML;
}
const createTable=(arr) =>{
    if(arr && arr.length>0){
    let content="";
    arr.map((item)=> {
        content+=`
        <tr>
        <td>${item.id}</td>
        <td>${item.tenSP}</td>
        <td>${item.gia}</td>
        <td><img src="../BaitapE6/${item.hinhAnh}" width="50"></td>
        <td> <button class="btn btn-info mr-3" onclick="editItem(${item.id})">Edit</button><button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button></td>
        </tr>
        `
    });
    // document.getElementById("tblDanhSachSanPham").innerHTML=content;
    return content;
}
}

window.deleteItem = deleteItem;
console.log(window);
function deleteItem(id){
    // deleteProductService(id)
    callapi(`Schema/${id}`,"DELETE")
    .then((result)=>{
        renderListProduct();
    })
    .catch((err)=>{
        console.log(err);
    })
    // console.log(id);
}
const renderListProduct = () =>{
    // getListProductService()
    callapi("Schema","GET",null)
    .then((result)=>{
        console.log(result.data);
        document.getElementById("tblDanhSachSanPham").innerHTML=createTable(result.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}
renderHTML();
renderListProduct();

document.getElementById("btnThem").addEventListener("click",()=>{
    let tenSP=document.getElementById("tenSP").value;
    let gia=document.getElementById("gia").value;
    let linkHinh=document.getElementById("hinhAnh").value;
    let product = new Product("",tenSP,gia,linkHinh);
    // console.log(product);
    // addProductService(product)
    callapi("Schema","POST",product)
    .then((result)=>{
        renderListProduct();
    })
    .catch((err)=>{
        console.log(err);
    })
})   
window.editItem = editItem;
function editItem(id){
    // getItemService(id)
    callapi(`Schema/${id}`,"PUT")
    .then((result)=>{
        console.log(result);
        document.getElementById("maSP").value=result.data.id;
        document.getElementById("tenSP").value=result.data.tenSP;
        document.getElementById("gia").value=result.data.gia;
        document.getElementById("hinhAnh").value=result.data.hinhAnh;
    })
    .catch((err)=>{
        console.log(err);
    })
}

document.getElementById("btnCapNhat").addEventListener("click",()=>{
    let id = document.getElementById("maSP").value;
    let tenSP=document.getElementById("tenSP").value;
    let gia=document.getElementById("gia").value;
    let linkHinh=document.getElementById("hinhAnh").value;
    let product = new Product(id,tenSP,gia,linkHinh);
    updateItemService(product)
    .then((result)=>{
        renderListProduct();
    })
    .catch((err)=>{
        console.log(err);
    })
})