import React, {useEffect} from "react";

function RedirectExample() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            // 👇️ redirects to an external URL
            window.location.replace('https://en.wikipedia.org/wiki/Black_hole');
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return <>Will redirect in 5 seconds...</>;
}

const BlackHole = () => {
    RedirectExample();
    return (
        <div className="full-page">
            <div style={{position: "absolute", top: "40vh", bottom: "40vh", left: "20vw", right: "20vw"}}>
                <h1  className="home" style={{fontSize: "5vw"}}>Will redirect in 5 seconds...</h1>
            </div>
        </div>
    )
}


export default BlackHole;