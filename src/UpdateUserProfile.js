
export default async function(firebase, data, uid){

	console.log('updating user doc with info of', data)

	const db = firebase.firestore();
	const userRef = db.collection('users').doc(uid);

	try{
		userRef.set(data)
		return true;
	}
	catch(e){
		console.log(e)
		return false
	}


}