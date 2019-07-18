//render chat template to the DOM
//clear the room of chats when room changes

class ChatUi {
    constructor(list){
        this.list = list;
    }

    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),  {addSuffix: true}
        );
        const html = `
        <li class="list-group-item"> 
            <span class="username">${data.username}</span>
            <span>${data.message}</span> 
            <div class="time"> ${when} </div>
        </li>
        `;
        this.list.innerHTML +=html;
    }

    clear(){
        this.list.innerHTML = '';
    }
}

