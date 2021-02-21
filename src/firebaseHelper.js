import firebase from 'firebase/app';

export default function(){

	if (!firebase.apps.length) {
		var firebaseConfig = {
			apiKey: "AIzaSyAVLfJmn-WkAGp7R3tEIBk-CYAVZ6-iR-o",
			authDomain: "envios-bb361.firebaseapp.com",
			projectId: "envios-bb361",
			storageBucket: "envios-bb361.appspot.com",
			messagingSenderId: "584556975097",
			appId: "1:584556975097:web:67950bd892e7e1070b6328",
			measurementId: "G-V0F2VLG6W8"
		};
		// Initialize Firebase

		firebase.initializeApp(firebaseConfig);
	}else {
		firebase.app(); // if already initialized, use that one
	}

	return firebase

}
