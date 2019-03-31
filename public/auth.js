// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: 'https://context.ninja',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      // Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable this provider in one-tap sign-up.
      authMethod: 'https://accounts.google.com',
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console.
      clientId: '125715055509-qn3nnevhmmciois80tp0tl4lobj97lth.apps.googleusercontent.com'
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

var authJiraFunction = firebase.functions().httpsCallable('jiraOAuth');

authJira = function () {
  authJiraFunction({text: "test"}).then(function(result) {
    console.log(result.data.text);
  });
};

initApp = function() {

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.disableAutoSignIn();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('welcome-text').textContent = 'Hello, ' + displayName + '!';
        var photo = document.createElement("img");
        photo.src = photoURL;
        photo.height = 100;
        photo.width = 100;
        var photoContainer = document.createElement("img");
        photoContainer.id = "photo-container";
        photoContainer.appendChild(photo);
        var signOut = document.createElement("button");
        signOut.innerHTML = "Sign Out";
        signOut.onclick = function () {
          firebase.auth().signOut();
          signOut.remove();
        };
        signOut.id = "sign-out";
        var app = document.getElementById("app");
        app.appendChild(photo, app);
        app.appendChild(document.createElement("br"), app);
        app.appendChild(signOut, app);
      });
      var authJiraButton = document.createElement("button");
      authJiraButton.onclick = authJiraFunction;
    } else {
      // User is signed out.
      document.getElementById('welcome-text').textContent = 'Login';
      document.getElementById('app').innerHTML = '';
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }, function(error) {
    console.log(error);
  });

  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

};

window.addEventListener('load', function() {
  initApp()
});


