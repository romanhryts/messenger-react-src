import {Component} from "react";
import ContactsFind from "../ContactsFind/ContactsFind";
import ContactsList from "../ContactsList/ContactsList";

import "./contacts.scss";

class Contacts extends Component {
    state = {
        keyWord: '',
    };


    onSearching = (key) => {
        this.setState({
            keyWord: key
        });
    }

    render() {
        const {logInPersonImg, logInPersonName, onChoosingContact, contacts} = this.props;
        const {keyWord} = this.state;
        const renderContacts = contacts
            .filter(item => item.name.trim().toLowerCase().includes(keyWord))
            .map((contact, i, self) => {
                const {name, photo, lastMessage, lastMessageDate} = contact;
                return (
                    <div className="chat" key={this.id++} onClick={() => onChoosingContact(name, self)}>
                        <img src={photo} alt={name} className="user-avatar avatar"/>
                        <div className="chat__body">
                            <h4 className="chat__body-username">{name}</h4>
                            <span className="last-message">{lastMessage}</span>
                            <span className="last-message-date">{lastMessageDate}</span>
                        </div>
                    </div>
                );
        });
        return (
            <div className="contacts">
                <ContactsFind
                    logInPersonImg={logInPersonImg}
                    logInPersonName={logInPersonName}
                    onSearching={this.onSearching}
                />
                <ContactsList
                    contacts={renderContacts}
                />
            </div>
        );
    }
}

export default Contacts;