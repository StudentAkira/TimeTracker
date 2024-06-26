import { APIEndpoints, frontURLs } from "../../enums.tsx";
import "./navbar.css"


function NavBar() {

    const logout = async () => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        credentials:"include"
        };

        await fetch(APIEndpoints.logout, requestOptions);

        window.location.href = frontURLs.login;
        localStorage.removeItem("user_data");
    }


  return (
    <div className="navbar">
        <div className='nav_items'>

            <div className='nav_item'>
                <div className='nav_link'>
                    <a href={frontURLs.note}>Note</a>
                </div>
            </div>

            <div className='nav_item'>
                <div className='nav_link'>
                <a href={frontURLs.subject}>Subject</a>
                </div>
            </div>

            <div className='nav_item'>
                <div className='nav_link'>
                <a href={frontURLs.topic}>Topic</a>
                </div>
            </div>

            <div className='nav_item'>
                <div className='nav_link drop_down'>
                    <a href={frontURLs.period}>Period</a>
                    
                    {/* <div class="dropdown-content">
                        <div className="drop_link">
                            <a href={frontURLs.period_create}>Link 1</a>
                        </div>
                        <div className="drop_link">
                            <a href="#">Link 2</a>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='nav_item'>
                <div className='nav_link'>
                <button onClick={logout} className='logout_button'>
                    logout
                </button>
                </div>
            </div>
            
        </div>    
    </div>
  );
}

export default NavBar;
