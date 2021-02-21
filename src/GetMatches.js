export default async function(uid, firebase){

	const results = [];

	await firebase.firestore().collection('users').doc('00000Example').collection('Matches').get().then(matchRefernces => {
		matchRefernces.docs.forEach(doc => {
			results.push(doc.data());
			})
	})
	return results;
}