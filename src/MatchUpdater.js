

export default function(firstUser, secondUser, firebase)
{
	const potentialMatches = firstUser.collection('PotentialMatches').doc(secondUser);
	const potentialMatchesSecond = secondUser.collection('PotentialMatches').doc(firstUser);
	return firebase.firestore().runTransaction(async(t) => {
		potentialMatches.get().then(matchNum => {
			matchNum = matchNum.data()['MatchCount']++;
			t.set(potentialMatchesSecond, {MatchCount: matchNum})
			t.set(potentialMatches, {MatchCount: matchNum})
			if (matchNum > 3) {
				t.set(firebase.firestore().collection('users').doc(firstUser).collection('Matches').doc(secondUser), {uid: secondUser})
				t.set(firebase.firestore().collection('users').doc(secondUser).collection('Matches').doc(firstUser), {uid: firstUser})
			}
		})
	})
}