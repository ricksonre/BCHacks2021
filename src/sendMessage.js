export default function(userOne,userTwo,firebase, message){

	const userOneRef = firebase.firestore().collection('users').doc(userOne).collection('Messages').doc(userTwo)
	const userTwoRef = firebase.firestore().collection('users').doc(userTwo).collection('Messages').doc(userOne)

	firebase.firestore().runTransaction(async (t) => {

		let newMessage
		let exists = false
		await userOneRef.get().then( userOneData => {

			if(userOneData.data()) {
				newMessage = {
					messages: [...userOneData.data()['messages'], {user: userOne, message: message}]
				}
				exists = true;
			}


		})
		if(exists) {
			t.update(userOneRef, newMessage);
			t.update(userTwoRef, newMessage);
		}
		else{
			t.set(userOneRef, {otherUser: userTwo, messages: [{message: message, user: userOne}]})
			t.set(userTwoRef, {otherUser: userOne, messages: [{message: message, user: userOne}]})
		}
	})


}
