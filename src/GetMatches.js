export default function(uid, firebase){

	const db = firebase.firestore();

	const matchRefernces = db.collection('users').doc(uid).collection('Matches');

	const matches = [];
	for (const uid in matchRefernces) 
	{
		matches.push(uid)
	}
	return matches

}