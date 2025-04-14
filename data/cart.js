export let cart=
JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionsID:'1'
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionsID:'3'
    }];
}
function savtostorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addtocart(productId){
    let matchingitem;

    cart.forEach((item)=>{
        if(productId===item.productId){
            matchingitem=item;
        }
    })
    if(matchingitem){
        matchingitem.quantity+=1;
    }else{
        cart.push({
            productId:productId,
            quantity:1,
            deliveryOptionsID:'1'
        })}
    savtostorage();  }  

export function removefromcart(productId){
    const newcart=[];
    cart.forEach((item)=>{
        if(item.productId !== productId){
            newcart.push(item);
        }
    });
    cart=newcart;
    savtostorage();
}        
export function updatedeliveryoption(productId,deliveryOptionsID){
    let matchingitem;
    cart.forEach((item)=>{
        if(productId===item.productId){
            matchingitem=item;
        }
    });
    matchingitem.deliveryOptionsID=deliveryOptionsID;
    savtostorage();
}