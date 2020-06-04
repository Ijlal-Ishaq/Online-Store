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

  const fref=firebase.database().ref('users/');

  var user;

  firebase.auth().onAuthStateChanged(function(usr){
      user=usr;

      

      fref.child(user.uid).on('value',function(snapshot){
       
        document.getElementById("username_lo").innerHTML=snapshot.child('username').val();
      
    });

      document.getElementById("email_lo").innerHTML=user.email;

      


    });



function login(){



    const auth =firebase.auth();
    const promise=auth.signInWithEmailAndPassword(document.getElementById("email").value,document.getElementById("password").value);
    promise.catch(e => alert(e.message));
    promise.then( error=>{
       
        if(user!=null){
             window.location.href="/index.html";
        }
    }

        
    )





}



function register(){
    
    
    
    if(document.getElementById("username").value!=""){
        const auth=firebase.auth();
        const promise=auth.createUserWithEmailAndPassword(document.getElementById("email").value,document.getElementById("password").value);
        promise.catch( e=>alert(e.message));
        promise.then(
            fref.child(user.uid).set({
             username : document.getElementById("username").value,
             },
            error=>{
                if(error){
                    alert(error);
                }else{
                     window.location.href="/index.html";
                }
            }
            )
        );

    }
    

}

function logout(){


    firebase.auth().signOut().then(function(){
        window.location.href="/login.html"
    });

}



