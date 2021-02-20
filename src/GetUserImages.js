export default async function(uid, firebase){

	const db = firebase.firestore();

	const userImages = await db.collection('users').doc(uid).collection('Images').get()

	return userImages.docs.map(doc => doc.data()['ImageLink']);

}