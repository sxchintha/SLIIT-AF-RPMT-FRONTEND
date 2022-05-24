import React from "react";

function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-2 border-top">
                <div className="col">
                    <div className="container">
                        <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-2">
                            <div className="col-md-4 d-flex align-items-center">
                                {/* <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                            <i className="bi bi-bootstrap"></i>
                                            </a> */}
                                <span className="mb-3 mb-md-0 text-muted">&copy; 2022 Company, Inc</span>
                            </div>

                            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                                <li className="ms-3"><a className="text-muted" href="#"><i className="bi bi-twitter"></i></a></li>
                                <li className="ms-3"><a className="text-muted" href="#"><i className="bi bi-instagram"></i></a></li>
                                <li className="ms-3"><a className="text-muted" href="#"><i className="bi bi-facebook"></i></a></li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
