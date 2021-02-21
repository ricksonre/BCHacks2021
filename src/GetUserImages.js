export default async function(uid, firebase){
	const results = [];

	await firebase.firestore().collection('users').doc(uid).collection('Images').get().then(matchRefernces => {
		matchRefernces.docs.forEach(doc => {
			results.push(doc.data());
		})
	})
	return results;

}