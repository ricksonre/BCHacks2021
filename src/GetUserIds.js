export default async function(firebase) {

	const ref = firebase.firestore().collection('users')

	let results = [];

	await ref.get().then(refData => {
		refData.docs.forEach(doc => {
			results.push(doc.id);
		})
	})

	return results;

}