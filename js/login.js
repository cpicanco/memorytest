var CLIENT_ID = document.getElementsByName('google-signin-client_id')[0].content;
var KEY = document.getElementsByName('app-id')[0].content;
window.googleUser = {El: null, Zi: null};
window.initGoogleAPI = function() {
  window.gapi.load('client:auth2', configGoogleAPI);
};

window.showLoginWrapper = function() {
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

var updateGoogleUser = function(user){
  if (user.El) {
    document.getElementById('signin-wrapper').display = "none";
    document.getElementById('user-email').innerText = user.getBasicProfile().getEmail();
    document.getElementById('user-photo').src = user.getBasicProfile().getImageUrl();
    document.getElementById('user-name').innerText = user.getBasicProfile().getName();
  } else {
    document.getElementById('signin-wrapper').display = "block";
    document.getElementById('user-email').innerText = "";
    document.getElementById('user-photo').src = "media/visitante.png";
    document.getElementById('user-name').innerText = "visitante";
  };
  window.googleUser = user;
};

var signinChanged = function(signin){
  updateConsent(signin);
  if (signin) {
    window.gapi.client.setToken(window.googleUser.getAuthResponse().id_token)
  } else {
    window.googleUser = {El: null, Zi: null}
  };
  updateGoogleUser(window.googleUser);
};

var userChanged = function(user){
  updateGoogleUser(user);
  signinChanged(window.auth2.isSignedIn.get());
};

var configGoogleAPI = function() {
  window.gapi.client.init({
    apiKey: KEY,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    clientId: CLIENT_ID,
    scope: 'profile https://www.googleapis.com/auth/gmail.send'
  }).then(function() {
    window.auth2 = window.gapi.auth2.getAuthInstance();
    window.auth2.isSignedIn.listen(signinChanged);
    window.auth2.currentUser.listen(userChanged);
    document.getElementById('loading-svg').style.display = 'none';
    document.getElementById('user').style.display = 'block';
    document.getElementById('site-footer').style.display = 'block';
    document.getElementById('signin-button').onclick = function(){window.auth2.signIn()};
    updateConsent(false);
    console.log('google api initialized')
  }, function(error) {
    console.log(error);
  });
};