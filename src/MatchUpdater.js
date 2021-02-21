

export default function(firstUser, secondUser, firebase)
{
	const potentialMatches = firebase.firestore().collection('users').doc(firstUser).collection('PotentialMatches').doc(secondUser);
	const potentialMatchesSecond = firebase.firestore().collection('users').doc(secondUser).collection('PotentialMatches').doc(firstUser);
	return firebase.firestore().runTransaction(async(t) => {
		potentialMatches.get().then(matchNum => {
			console.log(matchNum.data())
			if(matchNum.data()){
			let num = matchNum.data().MatchCount+1;
			console.log("MATCH  NUM", num)
			potentialMatchesSecond.set({MatchCount: num})
			potentialMatches.set({MatchCount: num})
			if (num > 3) {
				firebase.firestore().collection('users').doc(firstUser).collection('Matches').doc(secondUser).set( {uid: secondUser})
				firebase.firestore().collection('users').doc(secondUser).collection('Matches').doc(firstUser).set({uid: firstUser})
			}}
			else{
				potentialMatches.set({MatchCount: 1})
				potentialMatchesSecond.set({MatchCount: 1})
			}
		})
	})
}