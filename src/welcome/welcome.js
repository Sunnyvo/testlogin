import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';
import "./welcome.css";
import {PostData} from "../service/PostData.js";
import {Redirect} from 'react-router-dom';
class Welcome extends Component {
	constructor(props){
		super(props)
		this.state={
			redirectToReferrer: false
		}
		this.signup = this.signup.bind(this);
	}

	signup(res, type){
		let postData;
		if(type === 'facebook' && res.email){
			postData = {
				name: res.name, 
				provider: type,
				email: res.email,
				provider_id: res.id,
				token: res.accessToken,
				provider_pic: res.provider_pic
			}
		}
		if(type === 'google' && res.w3.U3){
			postData = {
				name: res.w3.ig, 
				provider: type,
				email: res.w3.U3,
				provider_id: res.El,
				token: res.Zi.access_token,
				provider_pic: res.w3.Paa
			}
		}
		
		PostData('signup',this.state).then((result) => {
			let responseJson = result;
			if(responseJson.userData){
			sessionStorage.setItem('userData',JSON.stringify(responseJson));
			this.setState({redirectToReferrer: true});
			}
		})
	}
	render() {
		if (this.state.redirectToReferrer){
			return  <Redirect to={'http://localhost:3000/'}/>
		}
		const responseFacebook = (response) =>  {
			console.log(response);
			this.signup(response, 'facebook')
		}
		const responseGoogle = response => {
			console.log(response);
			this.signup(response, 'google')
		}

		const responseGithub = response => {
			console.log(response);
			console.error(response);
			// this.signup(response, 'github')
		}
		return (
			<div className="row" id="Body">
				<div className="medium-12 columns">
					<GoogleLogin
						clientId="183626327916-tdd38ls5t4majitojs2uk71otigknj36.apps.googleusercontent.com"
						buttonText="Login"
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
					/>
					<FacebookLogin
						appId="1792468211053117"
						autoLoad={true}
						field="name, email, picture"
						onClick={responseFacebook}
						callback={responseFacebook}
					/>

					<GitHubLogin 
						clientId="4ea83a6419765ad541ac"
						// clientSecret="0ed6be02055077749f68d1f55b4e0cc37739a646"
						redirectUri="" 
						onSuccess={responseGithub}
						onFailure={responseGithub}
						/>
					);
					<a href="signup" className="button success"> Signup </a>
				</div>
			</div>
		)
	}
}

export default Welcome