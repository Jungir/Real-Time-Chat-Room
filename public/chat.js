//adding new chatroom 
//real-time  listener
//updating the username
//updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    //realtime listener return an unsubscribe funtion, sounds kina counter-intuitive
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(function (snapshot) {
           snapshot.docChanges().forEach(function (change) {
              if(change.type === 'added'){
                // update the ui
                //callback Function
                callback(change.doc.data());
              } 
           });
        });

    }
    updateName(username){
        this.username = username;
        localStorage.setItem('name', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if ( this.unsub){
            this.unsub();
        }
    }
}




// chatroom.addChat('hello everyone')
// .then(function () {
//     console.log('added');
// }).catch(function (err) {
//     console.log(err);
// });


//to fake the real user
// setTimeout(function () {
//     chatroom.updateRoom('general');
//     chatroom.updateName('Kama');

//     //re-subbing with the new room atached
//     chatroom.getChats(function (data) {
//     console.log(data);
//     });
//     // chatroom.addChat('hello');

// }, 3000);