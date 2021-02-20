export default function(userOne,userTwo, firebase){

	const db = firebase.firestore();


		const potentialMatches = userOne.collection('PotentialMatches').doc(userTwo);
		const potentialMatchesSecond = userTwo.collection('PotentialMatches').doc(userOne);
		return db().runTransaction(async(t) => {
			t.delete(potentialMatches).then(matchNum => {
				t.delete(potentialMatchesSecond)
				const userMatched = db.collection('users').doc(userOne).collection('Matches').doc(userTwo).get();
				if(userMatched.exists){
					t.delete( db.collection('users').doc(userOne).collection('Matches').doc(userTwo))
					t.delete( db.collection('users').doc(userTwo).collection('Matches').doc(userOne))
				}
			})
		})

}