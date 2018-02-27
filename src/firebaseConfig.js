import firebase from "firebase"

export const appName = "adv-react-fbf65"

export const firebaseConfig = {
  apiKey: "AIzaSyCriko0R-dwORp2lKU24u8Skydn4NOTbXc",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "1032196787603"
}

firebase.initializeApp(firebaseConfig)
