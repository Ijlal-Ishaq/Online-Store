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



var product = JSON.parse(localStorage.getItem("product_page"));







var cart=[];

if(JSON.parse(localStorage.getItem("cart_items"))!=null){
    cart=JSON.parse(localStorage.getItem("cart_items"));
}

function add_to_cart(itm){


    cart.push(itm);

    alert(itm.item +" added to your cart");
    
    
    localStorage.setItem("cart_items",JSON.stringify(cart));
    


}







// fref.on('child_added', function(snapshot) {
   

    // var email_= snapshot.child('Email').val();
    // var thought_= snapshot.child('Thought').val();


    window.onload =function(){



       

        document.getElementById("title").innerHTML="Product: "+product.item;
   
        document.getElementById("price").innerHTML="Price: "+product.price;


        document.getElementById("atc").onclick=function(){
    
  
            add_to_cart(product)

        }


        fetch_images(product);

        var fref_1 =firebase.database().ref().child("new_arrival").child(product.item_id).child("reviews");


        fref_1.on('child_added',function(snapshot){


            var h1=document.createElement("h1");
    h1.innerHTML = snapshot.child("email").val();
    h1.className="username";

    var p=document.createElement("p");
    p.innerHTML=snapshot.child("review").val();
    p.className="thought";

    var div =document.createElement("div");
    div.className="feeds"

    div.appendChild(h1);
    div.appendChild(p);
    

    document.getElementById("rv").append(div);



        });
    
    
    }
    

//   });



async function fetch_images(product) {

    var count=1;


    var fref =firebase.database().ref().child("new_arrival").child(product.item_id).child("more_imgs");
    fref.on('child_added', function(snapshot){


        var div=document.createElement('div');

        if(count==1){
        div.className="carousel-item active"
        count++
        }else{
            div.className="carousel-item "
        }

        var img=document.createElement('img');
        img.className="d-block img_"
        img.src=snapshot.val();
        

        div.appendChild(img);
        

        document.getElementById("img_div").prepend(div);



        
    })


}

var user;
firebase.auth().onAuthStateChanged(function(usr){
    user=usr;
  });


function submit_review(){
    var review = document.getElementById("review").value
    var fref2 =firebase.database().ref().child("new_arrival").child(product.item_id).child("reviews");
    
    if(user!=null){
    if(review !=""){
    fref2.push({
        email: user.email,
        review: review
    });
    }}
    else{
        alert("Login first to submit a review")
    }

}


