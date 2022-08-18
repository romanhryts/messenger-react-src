const ContactsFind = ({logInPersonImg, logInPersonName, onSearching}) => {
    return (
        <div className="contacts__find">
            <img src={logInPersonImg} alt={logInPersonName} className="my-avatar avatar"/>
            <div className="contacts__find-input">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    className="contacts__find-input"
                    type="text"
                    placeholder="Search or start new chat"
                    onChange={(e) => onSearching(e.currentTarget.value)}
                />
            </div>
        </div>
    );
}

export default ContactsFind;