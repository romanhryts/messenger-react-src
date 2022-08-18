import "./chat.scss";
import {Component} from "react";

class Chat extends Component {
    render() {
        const {onInputSendingMessage, choseContact, onSending, sendingMessage, contacts} = this.props;
        const noChoseContact = <h1 style={{alignSelf: "center", justifySelf: "center"}}>Please choose a chat</h1>;
        return (
            <div className="dialog">
                {!choseContact && noChoseContact}
                {choseContact &&
                    <ChatBody
                        contacts={contacts}
                        name={choseContact.name}
                        photo={choseContact.photo}
                        chatHistory={choseContact.chatHistory}
                        onInput={onInputSendingMessage}
                        onSending={onSending}
                        sendingMessage={sendingMessage}
                    />
                }
            </div>
        );
    }

}

const ChatBody = ({name, photo, chatHistory, onInput, onSending, sendingMessage, contacts}) => {
    const chat = chatHistory.map((item, i) => {
        const {author, message, date} = item;
        const myMessage = author === 'me';
        return (
            <div className={"message " + (myMessage ? 'my' : 'friend')} key={i}>
                <div>
                    {!myMessage && <img src={photo} alt={name} className="avatar"/>}
                    <p className="text">{message}</p>
                </div>
                <span className="message-date">{date}</span>
            </div>
        );
    }).reverse();

    return (
        <>
            <div className="current-user">
                <img src={photo} alt={name} className="avatar"/>
                <h4 className="current-user-name">{name}</h4>
            </div>
            <div className="current-dialog" style={{flexDirection: "column-reverse"}}>
                {chat}
            </div>
            <div className="sending-field">
                <div className="sending-field-container">
                    <input
                        type="text"
                        placeholder="Type your message"
                        onChange={(e) => onInput(e.currentTarget.value)}
                        value={sendingMessage}
                    />
                    <i
                        className="fa-solid fa-paper-plane"
                        onClick={() => onSending(sendingMessage, contacts, name)}
                    ></i>
                </div>
            </div>
        </>
    );
}

export default Chat;