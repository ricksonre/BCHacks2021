export default function(userOne,userTwo,firebase, message){

	const userOneRef = firebase.firestore().collection('users').doc('00000Example').collection('Messages').doc('00000Example')
	const userTwoRef = firebase.firestore().collection('users').doc('00000Example').collection('Messages').doc('00000Example')

	firebase.firestore().runTransaction(async (t) => {

		userOneRef.get().then( userOneData => {

			console.log(userOneData)

			const newMessage = {
				...userOneData.data(),
				messages: [ ...userOneData.data()['messages'], {user: userOne, message: message}]
			}

			t.set(userTwoRef, newMessage);
			t.set(userOneRef, newMessage);
		})



	})


}