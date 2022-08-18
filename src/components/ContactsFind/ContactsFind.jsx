const ContactsFind = ({onSearching}) => {
    return (
        <div className="contacts__find">
            <img src="https://i.pinimg.com/736x/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.jpg" alt="My Avatar" className="my-avatar avatar"/>
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