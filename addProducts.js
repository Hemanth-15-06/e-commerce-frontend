let addProducts=()=>{
    return `
<div class="registerForm">
    <form action="" class="addProductForm">

        <div>
            <h1>Add Product</h1>
        </div>
        <div>
            <input type="text" name="productName" placeholder="Product Name">
            <span><i class="fa-solid fa-box"></i></span>
        </div>
        <div>
            <input type="number" name="price" placeholder="Price">
            <span><i class="fa-solid fa-indian-rupee-sign"></i></span>
        </div>
        <div>
            <textarea name="description" placeholder="Description"></textarea>
            <span><i class="fa-solid fa-pencil-alt"></i></span>
        </div>
        <div class="selectCategory">  
            <select name="category">
                <option value="" disabled selected>Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                <option value="sports">Sports</option>
                <option value="beauty">Beauty</option>
            </select>
            <span><i class="fa-solid fa-list"></i></span>
        </div>
        <div>
            <input type="file" accept="image/*" name="productImage">
            <span><i class="fa-solid fa-image"></i></span>
        </div>
        <div>
            <button type="submit">Add Product</button>
        </div>
    </form>
</div>
    `
}

export let handelAddProductBind=()=>{
    const state={
        setState(name,value){
            this[name]=value
        }
    }
    const form=document.querySelector('.addProductForm')
    const inputs=document.querySelectorAll('input:not([type="file"])')
    const textArea=document.querySelector('textarea')
    const select=document.querySelector('select')
    function handelChnage(e){
        let {name,value,files}=e.target
        if(name=="productImage"){
            state.setState(name,files[0])
        }else{
            state.setState(name,value)
        }
    }
    function handelSubmit(e){
        e.preventDefault()
        let {productName,price,category,description,productImage}=state    
        let payload={productName,price,category,description,productImage};
        console.log(payload);
        (async()=>{
            try {
                let formData=new FormData()
                for(let key in payload){
                    formData.append(key,payload[key])
                }
                let res=await fetch("http://localhost:5000/api/products/add",{
                    method:"POST",
                    body:formData
                })
                console.log(res);
                let data=await res.json()
                console.log(data);
                if(data.success){
                    alert("Product added successfully")
                    form.reset()
                }
            } catch (error) {
                console.error("Error adding product:", error);
            }
        })()
    }

    inputs.forEach((input)=>{
        input.addEventListener('change',handelChnage)
    })
    textArea.addEventListener('change',handelChnage)
    select.addEventListener('change',handelChnage)
    form.addEventListener('submit',handelSubmit)
}

export default addProducts