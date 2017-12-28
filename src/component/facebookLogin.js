/*global FB*/
import React, { Component } from 'react';
import {Button } from 'bloomer';
class FacebookLogin extends Component{


  componentDidMount(){
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1792468211053117',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
      });
      FB.AppEvents.logPageView();   
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  facebookLogin = () => {
    window.FB.login(
      function(response){
        this.statusChangeCallback(response)
      }.bind(this)
    );
  }

  checkLoginState() {
    alert("checking login status")
    console.log("checking login status.......");
    window.FB.getLoginStatus(function (response){
      alert("FB CallBack")
      console.log("------>")
      console.log(response);
      this.statusChangeCallback(response)
    }.bind(this))

  }
  statusChangeCallback(response){
    console.log("we are checking the status changing call back");
    console.log(response);
    if (response.status=== "connected"){
      alert(" you are connected, now you will fetch data");
      this.fetchDataFacebook();
    }
    else if (response.status ==="not_authorized")
    {
      alert ("authorize app error before importing the data");
    }
    else 
      alert( " error during the import data");
  };

  fetchDataFacebook = () => {
    console.log("haha you are fetching data from facebook");
    window.FB.api('/me', function(user) {
      console.log(user);
      console.log('hahaha you are here friend: ' + user.name);
      alert("wellcome to coderschool!!" + user.name)

    }, {scope : 'email, user_work_history, user_education_history, user_location, public_profile'}
    
  )
  this.props.responseFacebook(scope);

  }

	render(){
		return(
				<Button isColor='info' style={{width:100}} onClick ={() => this.facebookLogin() }
          // scope="public_profile,email"
        >

					Facebook
				</Button>

		)
	}
}

export default FacebookLogin;