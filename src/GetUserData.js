import firebase from 'firebase'

export default async function(uid, firebase){

	let dataOut;

	await firebase.firestore().collection('users').doc(uid).get().then(data => {
		dataOut = data.data();
	})

	return dataOut


}