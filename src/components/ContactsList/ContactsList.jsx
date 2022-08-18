import {Component} from "react";

class ContactsList extends Component {
    render() {
        const {contacts} = this.props;
        return (
            <div className="contacts__list">
                <h3 className="contacts__list-title">Chats</h3>
                <div className="contacts__list-chats">
                    {contacts}
                </div>
            </div>
        );

    }
}

export default ContactsList;