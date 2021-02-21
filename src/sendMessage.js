export default function(userOne,userTwo,firebase, message){

	const userOneRef = firebase.firestore().collection('users').doc(userOne).collection('messages').doc(userTwo)
	const userTwoRef = firebase.firestore().collection('users').doc(userTwo).collection('messages').doc(userOne)

	firebase.firestore().runTransaction( (t) => {

		const userOneData = t.get(userOneRef);

		userOneData.get().then(async (userOneData) => {
			const newMessage = {
				...userOneData.data(),
				messages: [ ...userOneData.data()['messages'], {user: userOne, message: message}]
			}

			t.set(userTwoRef, newMessage);
			t.set(userOneRef, newMessage);
		})
	})

}