export const cart={
    cartItems : undefined,

    loadfromstorage: function(){
        this.cartItems=JSON.parse(localStorage.getItem('cart-oop'));
        if(!this.cartItems){
            this.cartItems=[{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:2,
                deliveryOptionsID:'1'
            },{
                productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity:1,
                deliveryOptionsID:'3'
            }];
        }
    },

    savtostorage : function(){
        localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
    },

    addtocart: function(productId){
        let matchingitem;
    
        this.cartItems.forEach((item)=>{
            if(productId===item.productId){
                matchingitem=item;
            }
        })
        if(matchingitem){
            matchingitem.quantity+=1;
        }else{
            this.cartItems.push({
                productId:productId,
                quantity:1,
                deliveryOptionsID:'1'
            })}
        this.savtostorage();  
    },

    removefromcart : function(productId){
        const newcart=[];
        this.cartItems.forEach((item)=>{
            if(item.productId !== productId){
                newcart.push(item);
            }
        });
        this.cartItems=newcart;
        this.savtostorage();
    }  ,

          
updatedeliveryoption : function(productId,deliveryOptionsID){
    let matchingitem;
    this.cartItems.forEach((item)=>{
        if(productId===item.productId){
            matchingitem=item;
        }
    });
    matchingitem.deliveryOptionsID=deliveryOptionsID;
    this.savtostorage();
}

};

cart.loadfromstorage();

console.log(cart);


