export function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8cDvKIAenhsySbKd8VM7JbxL1lViGsbDJw&s"
                    alt="logo"
                    className="logo"
                />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    );
}
