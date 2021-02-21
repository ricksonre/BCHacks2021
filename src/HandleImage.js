import mimeDb from 'mime-db'


	export default function(picture, uid, firebase){

		console.log(picture)
		var data = mimeDb[picture[0].type]
		console.log( data.extensions[0])
		var storageRef = firebase.storage().ref();
		var fileRef = storageRef.child(uid +'.'+ data.extensions[0]);
		fileRef.put(picture[0]).then(function(snapshot)
		{
			console.log('uploaded image', snapshot);
		})

	}