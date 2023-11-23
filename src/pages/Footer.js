

function Footer(){
    return (
        <nav className="py-2 bg-body-tertiary border-top" style={{ marginTop: 20 }}>
        <div className="container d-flex flex-wrap">
            <ul className="nav me-auto">
            <li className="nav-item">
                <a
                href="mailto:szimenkova7@gmail.com"
                className="nav-link link-dark px-2"
                >
                Поддержка
                </a>
            </li>
            </ul>
            <ul className="nav align-items-center">
            <li>
                <a className="px-2" href="https://cs.petrsu.ru/">
                © ПетрГУ 2023
                </a>
            </li>
            </ul>
        </div>
        </nav>
    );
}

export default Footer;