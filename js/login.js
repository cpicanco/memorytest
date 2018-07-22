var auth2; // The Sign-In object.
var googleUser; // The current user.

var onClickGoogleSignInSuccess = function(user) {
  updateGoogleUser(user);   
}

var onClickGoogleSignInFailure = function(error) {
  alert(JSON.stringify(error, undefined, 2));
}

var initGoogleAPI = function() {
  gapi.load('auth2', configGoogleAPI);
};

var configGoogleAPI = function() {
  // Retrieve the singleton for the GoogleAuth library and set up the client.
  auth2 = gapi.auth2.init({
    client_id: '441105335360-90p4p1av69nimp2djlcdh06pgv0sqkrj.apps.googleusercontent.com'
  });
    
  auth2.attachClickHandler(
    'signin-button',
    {},
    onClickGoogleSignInSuccess,
    onClickGoogleSignInFailure
  );

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  // auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
    console.log('a user signed-in')
  }
  // Start with the current live values.
  updateGoogleUser(auth2.currentUser.get());
};


/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('sign-in changed')
  console.log(val)
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
// var userChanged = function (user) {
//   console.log(user)
//   googleUser = user;
//   updateGoogleUser();
// };

/**
 * Updates the properties in the Google User table using the current user.
 */
var updateGoogleUser = function (user) {
  if (user.El) {
    document.getElementById('signin-wrapper').display = "none";
    document.getElementById('user-email').innerText = user.getBasicProfile().getEmail();
    document.getElementById('user-photo').src = user.getBasicProfile().getImageUrl();
    document.getElementById('user-name').innerText = user.getBasicProfile().getName();  
    // document.getElementById('user-id').innerText = user.getId();
    // document.getElementById('user-scopes').innerText = user.getGrantedScopes();
    // document.getElementById('auth-response').innerText = JSON.stringify(user.getAuthResponse(), undefined, 2);
    // window.location.replace("/app");  
  } else {
    document.getElementById('signin-wrapper').display = "block";
    document.getElementById('user-email').innerText = "";
    document.getElementById('user-photo').src = "media/visitante.png";
    document.getElementById('user-name').innerText = "visitante";  
  }
  googleUser = user;
};

function showLoginWrapper() {
  var checkBox = document.getElementById("consent");
  var wrapper = document.getElementById("signin-wrapper");

  // If the checkbox is checked, display the output text
  if (checkBox.checked){
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
}