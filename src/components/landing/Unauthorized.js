import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const localToken = JSON.parse(localStorage.getItem("localToken"));

    const goBack = () => navigate(-1);
    const gologin = () => navigate('/login');

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                {/* <button onClick={goBack}>Login</button> */}
                {
                    localToken && getCookie("usertoken")
                        ? <button onClick={goBack}>Go back</button>
                        : <button onClick={gologin}>Login</button>
                }
            </div>
        </section>
    )
}

export default Unauthorized
