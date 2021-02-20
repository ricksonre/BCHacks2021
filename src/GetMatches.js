export default function(uid, firebase){

	const db = firebase.firestore();

	const matchRefernces = db.collection('users').doc(uid).collection('Matches');

	const matches = [];

	matchRefernces.forEach(ref => {
		matches.push(ref.id);
	})

	return matches

}