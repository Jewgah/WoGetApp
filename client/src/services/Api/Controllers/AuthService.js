import isNil from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import Cookies from 'universal-cookie';
import { decodeJwt } from '../../Global/JwtDecode';
import { capitalize } from '@mui/material';
import ApiService from '../ApiService';


class AuthService {
  static isLogged() {
    AuthService.isAuth();
    let token = AuthService.getToken();
    return (token !== '');
  }
  static isAuth(){
    return ApiService.get("api/auth/tokenisvalide", "", AuthService.getToken()).then(res => { 
      // console.log(res)
      if(res.status === 400) {
        return true;
      } else {
        this.logOut();
        return false
      }
    })
  }

  static getToken() {
    let token = localStorage.getItem('token');
    if(isNil(token) || isUndefined(token) || token === '') {
      const cookies = new Cookies();
      token = cookies.get('token');
      if(isNil(token) || isUndefined(token) || token === '') {
        return '';
      }
    }
    return token;
  }


  static getRememberMe() {
    let rememberMe = localStorage.getItem('rememberMe');
    if(isNil(rememberMe) || isUndefined(rememberMe) || rememberMe === '') {
      const cookies = new Cookies();
      rememberMe = cookies.get('rememberMe');
      if(isNil(rememberMe) || isUndefined(rememberMe) || rememberMe === '') {
        return  0;
      }
    }
    return rememberMe;
  }

  static getIDUser() {
    let token = this.getToken();
    if(token==='') 
      return 0;
    const decodeToken=decodeJwt(token);
    const current_societe=decodeToken.user.id;
    
    return current_societe;
  }

  static getNameUser() {
    let token = this.getToken();
    if(token==='') 
      return 0;
    const decodeToken=decodeJwt(token);
    const current_societe=capitalize(decodeToken.name);
    return current_societe;

  }
  

  static signIn(email, password, rememberMe = 1) {
    return ApiService.signIn(email, password)
      .then(res => {
        if(isString(res.token)){
          try {
            localStorage.setItem('rememberMe', rememberMe);
            localStorage.setItem('token', res.token);
          } catch(e) {
            // console.log("error save to LocalStorage")
          }
          return true;
        }
        throw new Error("Invalid value")
      })
      .catch(error => {
        throw error;
      })
  }

  static signUp(email, password,lastname,firstname,phone) {
    return ApiService.post("api/auth/signup",{email, password,lastname,firstname,phone},"")
      .then(res => {
        if (res.status === 201) {
          alert("Your account has been successfully created");
         return res.id;
        } else if (res.status === 409) {
          alert("Email is already used");
         return 0
      }else{
        return 0;
      }})
      .catch(error => {
        if (error.status === 409) { 
          alert("Email is already used");
          return 0;
        }else if (error.status === 400) { 
          alert("We need to specify all attributes");
          return 0;
        }
      })
  }

  static setTokenCookie(token, rememberMe) {
    const cookies = new Cookies();
    let options = {};
    if(rememberMe) {
      options.maxAge = 30 * 86400;
    }
    cookies.set('token', token, options);
    cookies.set('rememberMe', rememberMe, options);
    return true;
  }


  static logOut() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  static UpdatePasswordbyId(data){
    return ApiService.put("auth/update",data,AuthService.getToken())
    .then(res=>{if(res.status===200)return true 
      else return false 
    })
    .catch(()=>{
      return false;
    })
  }
  
  static getMe() { 
    return ApiService.get("api/auth/me", "", AuthService.getToken())
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          return false;
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
  }
}

export default AuthService;
