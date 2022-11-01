import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const config = {
  apiKey: "AIzaSyBNYsRJ94DJj73hlDqCVXlmYx8whvUPRQQ",
  authDomain: "llegoshop.firebaseapp.com",
  projectId: "llegoshop",
  storageBucket: "llegoshop.appspot.com",
  messagingSenderId: "266224580496",
  appId: "1:266224580496:web:b503cdde3f8d17011da515",
  measurementId: "G-H11NB0YNGV"
};

const fire = firebase.initializeApp(config)
const storage = firebase.storage()
const auth = firebase.auth()

export{
    fire,
    storage,
    firebase,
    auth
}
