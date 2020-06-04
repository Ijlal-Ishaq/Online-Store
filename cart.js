

var cart=JSON.parse(localStorage.getItem("cart_items"));



var total_price=0;



window.onload=function(){
   


for(i=0;i<this.cart.length;i++ ){

    var itm_tr=document.createElement("tr");
    itm_tr.className="itm_tr";

    var itm=document.createElement("td");
    itm.className="itm";

    var itm_img=document.createElement("img");
    itm_img.className="itm_img";
    itm_img.src=JSON.parse(JSON.stringify(cart[i].img_url));

    var itm_name=document.createElement("h1");
    itm_name.className="itm_name";
    itm_name.innerHTML=JSON.parse(JSON.stringify(cart[i].item));


    var qty=document.createElement("td");
    qty.className="qty";
    qty.innerHTML="1";


    var price=document.createElement("td");
    price.className="price";
    price.innerHTML=JSON.parse(JSON.stringify(cart[i].price));



    itm.appendChild(itm_img);
    itm.appendChild(itm_name);

    itm_tr.appendChild(itm);
    itm_tr.appendChild(qty);
    itm_tr.appendChild(price);


    total_price+=parseInt(JSON.parse(JSON.stringify(cart[i].price)));
    
    
    document.getElementById("table").appendChild(itm_tr);
    document.getElementById("total").innerHTML="Total: "+total_price+"/-"
    

    


}
}



function buy(){
    alert("Order Placed Successfully");
    localStorage.setItem("cart_items",null);
    window.location.href="/index.html";
}