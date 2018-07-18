var googleUser = {};
var initGoogleAPI = function() {
  gapi.load('auth2', function() {
    
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '441105335360-90p4p1av69nimp2djlcdh06pgv0sqkrj.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    
    auth2.attachClickHandler(
      document.getElementById('signin-button'),
      {},
      function(googleUser) {
      	document.getElementById('google-signin-wrapper').display = "none";
        document.getElementById('user-email').innerText = googleUser.getEmail();
        document.getElementById('user-photo').src = googleUser.getImageUrl();
        document.getElementById('user-name').innerText = googleUser.getName();  
        window.location.replace("/app")       
      },
      function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  });
};
