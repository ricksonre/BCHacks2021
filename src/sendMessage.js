export default function(userOne,userTwo,firebase, message){

	const userOneRef = firebase.firestore().collection('users').doc('00000Example').collection('Messages').doc(userTwo)
	const userTwoRef = firebase.firestore().collection('users').doc(userTwo).collection('Messages').doc('00000Example')

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
			t.set(userOneRef, {otherUser: userTwo, messages: [{message: message, user: '00000Example'}]})
			t.set(userTwoRef, {otherUser: '00000Example', messages: [{message: message, user: '00000Example'}]})
		}
	})


}
