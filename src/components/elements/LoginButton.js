import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <div>
            {!isAuthenticated &&
                <button onClick={() => loginWithRedirect()}>
                    LOGIN
                </button>
            }
            {isAuthenticated &&
                <h1 style={{
                    "position": "absolute",
                    "top": "80vh",
                    "textAlign": "center",
                    "width": "100vw",
                    "fontFamily": "lineal"
                }}> ENTER </h1>
            }
        </div>
    )
}

export default LoginButton;