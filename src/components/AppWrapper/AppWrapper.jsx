import {Component} from "react";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";

class AppWrapper extends Component {
    state = {
        contacts: [],
        choseContact: null,
        sendingMessage: ''
    }

    id = 0;

    componentDidMount() {
        if (!localStorage.getItem('contacts')) {
            const contacts = [
                {
                    name: 'Alice Freeman',
                    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlJTIwaW4lMjBncm91cHxlbnwwfHwwfHw%3D&w=1000&q=80',
                    lastMessage: 'You are the worst!',
                    lastMessageDate: 'Jun 12, 2017',
                    chatHistory: [
                        {message: 'It looks like I broke our application', author: 'me', date: '6/12/17, 1:00 AM'},
                        {message: 'You are the worst!', author: 'user', date: '6/12/17, 2:30 AM'},
                    ],
                },
                {
                    name: 'Velazquez',
                    photo: 'https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=',
                    lastMessage: 'We are losing money! Quick!',
                    lastMessageDate: 'Feb 18, 2017',
                    chatHistory: [
                        {message: 'Quickly come to the meeting room 1B, we have a big server issue', author: 'user', date: '4/22/17, 4:00 AM'},
                        {message: "I am having breakfast right now, can't you wait for 10 minutes?", author: 'me', date: '4/22/17, 4:00 AM'},
                        {message: 'We are losing money! Quick!', author: 'user', date: '4/22/17, 4:05 AM'}
                    ],
                },
                {
                    name: 'Adam Bay',
                    photo: 'https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=',
                    lastMessage: 'Quickly come to the meeting room 1B, we have a big server issue',
                    lastMessageDate: 'Jan 18, 2017',
                    chatHistory: [
                        {message: 'Quickly come to the meeting room 1B, we have a big server issue', author: 'user', date: '1/18/17, 9 PM'},
                    ],
                },
                {
                    name: 'Barrera',
                    photo: 'https://images.pexels.com/photos/2467401/pexels-photo-2467401.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                    lastMessage: 'Call me please as soon as possible.',
                    lastMessageDate: 'Dec 3, 2016',
                    chatHistory: [
                        {message: 'Call me please as soon as possible.', author: 'user', date: '12/3/16, 7:43 PM'}
                    ],
                },
            ];
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
        this.setState({
            contacts: JSON.parse(localStorage.getItem('contacts'))
        });
    }

    onChoosingContact = (name, array) => {
        const contact = array.find(item => item.name === name);
        this.setState({
            choseContact: contact
        })
    }

    onInputSendingMessage = (value) => {
        this.setState({
            sendingMessage: value,
        });
    }

    getDateChat = () => {
        const date = new Date(Date.now());
        const month = date.getMonth() + 1;
        const day = Number(date.toLocaleDateString().slice(0, 2));
        const year = date.getFullYear();
        return `${month}/${day}/${year}, ${
            date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }`;
    }

    getDateContacts = () => {
        const date = new Date(Date.now());
        const year = date.getFullYear();
        const month = date.toLocaleDateString('en-EN', {month: 'short'});
        const day = date.getDate()
        return `${month} ${day}, ${year}`;
    }

    getAnswer = async () => {
        const url = 'https://api.chucknorris.io/jokes/random';
        const response = await fetch(url);
        const data = await response.json();
        return await data.value;
    }

    onSending = (text, contacts, name) => {
        if (text.trim()) {
            this.getAnswer()
                .then(res => {
                    const message = {message: text, author: 'me', date: this.getDateChat()};
                    const answer = {message: res, author: 'user', date: this.getDateChat()};

                    const contactsStorage = JSON.parse(localStorage.getItem('contacts'));
                    const currentStorage = contactsStorage.find(item => item.name === name);
                    const idx = contactsStorage.findIndex(item => item.name === name);

                    const currentState = contacts.find(item => item.name === name);
                    const idxState = contacts.findIndex(item => item.name === name);

                    // update storage
                    currentStorage.chatHistory.push(message);
                    currentStorage.chatHistory.push(answer);
                    currentStorage.lastMessage = currentStorage.chatHistory[currentStorage.chatHistory.length - 1].message;
                    currentStorage.lastMessageDate = this.getDateContacts();

                    // update state
                    currentState.chatHistory.push(message);
                    currentState.chatHistory.push(answer);
                    currentState.lastMessage = currentState.chatHistory[currentState.chatHistory.length - 1].message;
                    currentState.lastMessageDate = this.getDateContacts();

                    const updatedStorage = [...contactsStorage.slice(0, idx), currentStorage, ...contactsStorage.slice(idx + 1)];
                    const updatedState = [currentState, ...contacts.slice(0, idxState), ...contacts.slice(idxState + 1)];

                    localStorage.setItem('contacts', JSON.stringify(updatedStorage));
                    this.setState({sendingMessage: '', 'contacts': updatedState});
                })
                .catch(e => console.log(e));
        }
    }

    render() {
        const {logInPersonName, logInPersonImg} = this.props;
        const {choseContact, sendingMessage, contacts} = this.state;
        return (
            <>
                <Contacts
                    // logInPersonImg={logInPersonImg}
                    // logInPersonName={logInPersonName}
                    onChoosingContact={this.onChoosingContact}
                    contacts={contacts}
                />
                <Chat
                    choseContact={choseContact}
                    onInputSendingMessage={this.onInputSendingMessage}
                    sendingMessage={sendingMessage}
                    onSending={this.onSending}
                    contacts={contacts}
                />
            </>
        );
    }
}

export default AppWrapper;