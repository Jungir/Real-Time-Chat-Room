//dom quiery 
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const chatRoom = document.querySelector('.chat-rooms');
//class instances

let name = localStorage.getItem('name') ? localStorage.getItem('name') : 'anon';



const chatUi = new ChatUi(chatList);
const chatroom = new Chatroom('gaming', name);

//get the chats and render
chatroom.getChats(function (data) {
    chatUi.render(data);
});

//add a new chat
newChatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(function () {
            newChatForm.reset();
        }).catch(function (err) {
            console.log(err);
        })
});

//update username
newNameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //update name via the chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();

    //show then hide msg

    updateMsg.innerText = `Your name has been update to ${newName}`;

    setTimeout(function () {
        updateMsg.innerText = ``;
    }, 3000)
})


//update the chat room
chatRoom.addEventListener('click', function (event) {
    if(event.target.tagName === 'BUTTON'){
        let roomName =  event.target.getAttribute('id');
        chatUi.clear();
        chatroom.updateRoom(roomName);

        //set up new listener for the new room:
        chatroom.getChats(function (chat) {
            chatUi.render(chat);
        });
    }
})