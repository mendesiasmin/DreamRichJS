
export class Auth{

  static checkAuth(){
    const minute = 1000*60;
    const quarter_hour = minute*1;
    if (Date.now() > Auth.start_login+quarter_hour){
      Auth.deauthenticate();
    } else {
      console.info('Time to logout (minute): '
        + (Auth.start_login + quarter_hour - Date.now())/minute
      );
    }
  }

  static updateDate(){
    Auth.start_login = Date.now();
  }

  static authenticate(token){
    console.log('Authenticate');
    if(token.token !== undefined && token.token !== null){
      Auth.start_login = Date.now();
      clearInterval(Auth.loginCheck);
      Auth.loginCheck = setInterval(Auth.checkAuth, 1000);
      localStorage.setItem('token', token.token);
    }
  }

  static isAuthenticated(){
    return localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null;
  }

  static getAuth(){
    return localStorage.getItem('token');
  }

  static deauthenticate(){
    console.log('Deauthenticate');
    clearInterval(Auth.loginCheck);
    return localStorage.removeItem('token');
  }

}
