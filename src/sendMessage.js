export default function(userOne,userTwo,firebase, message){

	const userOneRef = firebase.firestore().collection('users').doc('00000Example').collection('Messages').doc('00000Example')
	const userTwoRef = firebase.firestore().collection('users').doc('00000Example').collection('Messages').doc('00000Example')

	firebase.firestore().runTransaction(async (t) => {

		let newMessage

		await userOneRef.get().then( userOneData => {

			console.log(userOneData.data)

			newMessage = {
				...userOneData.data(),
				messages: [ ...userOneData.data()['messages'], {user: userOne, message: message}]
			}


		})

		t.set(userOneRef, newMessage);
		t.set(userTwoRef, newMessage);
	})


}