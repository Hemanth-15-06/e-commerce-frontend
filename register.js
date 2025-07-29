const register=()=>{
    return `
  
<div class="registerForm">
    <form action="">
        <div>
            <h1>Register</h1>
        </div>
        <div>
            <input type="text" name="name" placeholder="Name">
            <span><i class="fa-solid fa-signature"></i></span>
        </div>
        <div>
            <input type="email" name="email" placeholder="email">
            <span><i class="fa-solid fa-envelope"></i></span>
        </div>
        <div>
            <input type="password" name="password" placeholder="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" title="Must contain at least one uppercase letter, one lowercase letter, one number, one special character at least 8 or more characters">
            <span><i class="fa-solid fa-key"></i></span>
        </div>
         <div>
            <input type="password" name="re-password" placeholder="re-password">
            <span>

          
                <i class="fa-solid fa-repeat"></i>
            </span>
        </div>
        <div>
            <textarea name="address" placeholder="address"></textarea>
            <span><i class="fa-solid fa-location-dot"></i></span>
        </div>
        <div>
            <input type="file" accept=".png,.jpg" >
        </div>

        <div>
           <button>Submit</button>
        </div>
    </form>
</div>

    `
}

let registerBinding=()=>{const state={
  setState(name,value){
    this[name]=value
  }
}
const form=document.querySelector('form')
const inputs=document.querySelectorAll('input')
const textArea=document.querySelector('textarea')


function handelChnage(e){
let {name,value,files}=e.target
if(name!="re-password"){
  if(name=="profileimage"){
value=files[0]
const reader=new FileReader()
reader.onload=function(){
  form.style.backgroundImage=`url(${reader.result})`
}
reader.readAsDataURL(value)
state.setState(name,value)
  }else{
  state.setState(name,value)

  }
}
}

function checkPassword(e){
    let {name, value}=e.target

    if(name=="re-password"){

        state.password!=value?e.target.parentElement.style.borderBottom="3px solid red":e.target.parentElement.style.borderBottom='3px solid #111'
    } else
        return
}

function handelSubmit(e){
e.preventDefault()
// console.log(state);
let {name,email,password,address,profileimage}=state
if(!name||!email||!password||!address||!profileimage){
  alert("All Feilds are mandatory")
  return
}

console.log(password,state);
if(password!=state["re-password"]){
  
  alert("password and re-passsword should match")
  return
}
// console.log(state);

let payload={email,password,profileimage,address,name}
console.log(payload);

let formData=new FormData()
for(let data in payload){
  formData.append(data,payload[data])
  // console.log(data,payload[data]);
}
}

(async function submitData(){
  try{
    let response=await fetch("http://localhost:5000/register",{
      method:"POST",
      body:formData
    })
    let data=await response.json()
    console.log(data);
    if(data.status=="success"){
      alert("Registration Successful")
      form.reset()
      form.style.backgroundImage="none"
    }else{
      alert(data.message)
    }
  }catch(err){
    console.error(err);
  }
})()


form.addEventListener('submit',handelSubmit)
inputs.forEach(input=>{
  input.addEventListener('change',handelChnage)
})
inputs.forEach(input=>{
  input.addEventListener('input',checkPassword)
})
textArea.addEventListener('change',handelChnage)
}

export { registerBinding }

export default register