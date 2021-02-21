import firebase from 'firebase'

export default async function(uid, firebase){

	const db = firebase.firestore();
	 const docData = await db.collection('User').doc(uid).get().then(docData => {
		return docData.data();
	});

	 return docData

}