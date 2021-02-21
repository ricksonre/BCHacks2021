import GetMatches from "./GetMatches";


export default async function(uid, preference, firebase){

	let ref = {}

	if(preference) {
		ref =firebase.firestore().collection('users').where('gender', '==', preference)
	}
	else{
		ref =firebase.firestore().collection('users')
	}

	let results = [];

	await ref.get().then(refData => {
		refData.docs.forEach(doc => {
			results.push(doc.id);
		})
	})

	const matches = await GetMatches(uid, firebase)

	matches.forEach(match => {
		const index = results.indexOf(match.userID)
		if(index > 0){
			results.splice(index, 1)
		}
	})

	return results;

}