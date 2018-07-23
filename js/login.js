var CLIENT_ID = '441105335360-90p4p1av69nimp2djlcdh06pgv0sqkrj.apps.googleusercontent.com';
window.googleUser = {El: null, Zi: null};
window.initGoogleAPI = function() {
  window.gapi.load('client:auth2', configGoogleAPI);
};

var configGoogleAPI = function() {
  window.gapi.client.init({
    apiKey: 'AIzaSyB1N43N1iNus5iFQsjL-JwikXpBfuj2jYs',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    clientId: CLIENT_ID,
    scope: 'profile https://www.googleapis.com/auth/gmail.send'
  }).then(function() {
    window.auth2 = window.gapi.auth2.getAuthInstance();
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(signinChanged);
    window.gapi.auth2.getAuthInstance().currentUser.listen(userChanged);
    document.getElementById('signin-button').onclick = function(){window.gapi.auth2.getAuthInstance().signIn()};
    updateConsent(false);    
    console.log('google api initialized')
  }, function(error) {
    console.log(error);
  });
};

function showLoginWrapper() {
  var checkBox = document.getElementById("consent");
  var wrapper = document.getElementById("signin-wrapper");
  if (checkBox.checked){
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  };
};

document.getElementById("consent").onclick = showLoginWrapper;

var updateConsent = function(signin){
  var consentbox = document.getElementById('consent-box');
  var wrapper = document.getElementById("signin-wrapper");
  if (signin) {
    consentbox.style.display = 'none';
    wrapper.style.display = "none";
  } else {
    consentbox.style.display = 'block';
    showLoginWrapper();
  }  
};

var signinChanged = function(signin){
  console.log('sign-in changed', signin)
  updateConsent(signin);
  if (signin) {
    window.gapi.client.setToken(window.googleUser.getAuthResponse().id_token)
  } else {
    window.googleUser = {El: null, Zi: null}
  };  
  updateGoogleUser(window.googleUser);
};

var userChanged = function(user){
  window.googleUser = user;
};

var updateGoogleUser = function(user){
  console.log('a user was updated')
  window.googleUser = user;
  if (user.El) {
    document.getElementById('signin-wrapper').display = "none";
    document.getElementById('user-email').innerText = user.getBasicProfile().getEmail();
    document.getElementById('user-photo').src = user.getBasicProfile().getImageUrl();
    document.getElementById('user-name').innerText = user.getBasicProfile().getName();  
    // document.getElementById('user-id').innerText = user.getBasicProfile().getId();
    // document.getElementById('user-scopes').innerText = user.getBasicProfile().getGrantedScopes();
    // document.getElementById('auth-response').innerText = JSON.stringify(user.getAuthResponse(), undefined, 2); 
  } else {
    document.getElementById('signin-wrapper').display = "block";
    document.getElementById('user-email').innerText = "";
    document.getElementById('user-photo').src = "media/visitante.png";
    document.getElementById('user-name').innerText = "visitante";  
  };
};