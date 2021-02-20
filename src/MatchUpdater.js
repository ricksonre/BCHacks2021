

export default function(firstUser, secondUser, firebase)
{
	const db = firebase.firestore();
	const potentialMatches = firstUser.collection('PotentialMatches').doc(secondUser);
	const potentialMatchesSecond = secondUser.collection('PotentialMatches').doc(firstUser);
	return db().runTransaction(async(t) => {
		t.get(potentialMatches).then(matchNum => {
			matchNum = matchNum.data()['MatchCount']++;
			t.set(potentialMatchesSecond, {MatchCount: matchNum})
			t.set(potentialMatches, {MatchCount: matchNum})
			if (matchNum > 3) {
				t.set(db.collection('users').doc(firstUser).collection('Matches').doc(secondUser), {uid: secondUser})
				t.set(db.collection('users').doc(secondUser).collection('Matches').doc(firstUser), {uid: firstUser})
			}
		})
	})
}