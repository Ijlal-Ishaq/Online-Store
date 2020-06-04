var firebaseConfig = {
    apiKey: "**************************",
    authDomain: "**************************",
    databaseURL: "**************************",
    projectId: "**************************",
    storageBucket: "**************************",
    messagingSenderId: "**************************",
    appId: "**************************"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  

  var user;

  var items=[];

  

  firebase.auth().onAuthStateChanged(function(usr){
      user=usr;
    });


    function login(){

      firebase.auth().onAuthStateChanged(function(usr){
        user=usr;
      });

        if(user==null){
            window.location.href="/login.html"
        }else{
            window.location.href="/logout.html"
        }



    }

    function Cart(){
        window.location.href="/cart.html"
    }








// the below code is getting item cards from database



    var fref1=firebase.database().ref('new_arrival/');

  

  fref1.on('child_added', function(snapshot) {
   
    

    var item= snapshot.child('item').val();
    var price= snapshot.child('price').val();
    var item_id= snapshot.child('item_id').val();
    var img_url= snapshot.child('img_url').val();


    var itm={
        item : item,
        price: price,
        item_id:item_id,
        img_url:img_url,
    }

    items.push(itm);

    



    var card=document.createElement("div");
    card.className="card";
    

    var img=document.createElement("img");
    img.className="cart_img";
    img.src=img_url;
    img.onclick=function(){
        product_page(itm);
    }

    var card_title=document.createElement("h2");
    card_title.innerHTML=item;
    card_title.className="cart_title";


    var cart_price=document.createElement("h2");
    cart_price.innerHTML=price;
    cart_price.className="cart_price";

    var btn=document.createElement("button");
    btn.innerHTML="Add to Cart";
    btn.className="cart_btn";
    btn.onclick = function()
    {
        add_to_cart(itm);
    }
    

    card.appendChild(img);
    card.appendChild(card_title);
    card.appendChild(cart_price);
    card.appendChild(btn);

    

    
    document.getElementById("mb").prepend(card);
   

  });



  

  var cart=[];

if(JSON.parse(localStorage.getItem("cart_items"))!=null){
    cart=JSON.parse(localStorage.getItem("cart_items"));
}

  

  


  

  function add_to_cart(itm){


    cart.push(itm);

    alert(itm.item +" added to your cart");
    
    
    localStorage.setItem("cart_items",JSON.stringify(cart));
    


  }


  


  function product_page(itm){

    localStorage.setItem("product_page",JSON.stringify(itm));

      window.location.href="/product_page.html";
  }