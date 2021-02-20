
export default async function(firebase, data, uid){

	const db = firebase.firestore();
	const userRef = db.collection('User').doc(uid);

	try{
		await db().runTransaction(async(t) =>  {
		t.set(userRef, data)
		})
		return true;
	}
	catch(e){
		return false
	}


}