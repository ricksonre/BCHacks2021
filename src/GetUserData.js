import firebase from 'firebase'

export default async function(firebase, data, uid){

	const db = firebase.firestore();
	 const docData = await db.collection('User').doc(uid).get().then(docData => {
		return docData.data();
	});

	 return docData

}