export default function(userOne,userTwo,firebase, message){

	const db = firebase.firestore();

	const userOneRef = db.collection('users').doc(userOne).collection('messages').doc(userTwo)
	const userTwoRef = db.collection('users').doc(userTwo).collection('messages').doc(userOne)

	db().runTransaction( (t) => {

		const userOneData = t.get(userOneRef);

		userOneData.then(async (userOneData) => {
			const newMessage = {
				...userOneData.data(),
				messages: [ ...userOneData.data()['messages'], {user: userOne, message: message}]
			}

			t.set(userTwoRef, newMessage);
			t.set(userOneRef, newMessage);
		})


	})

}