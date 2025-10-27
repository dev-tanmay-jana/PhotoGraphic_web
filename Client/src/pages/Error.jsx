import { NavLink } from "react-router-dom";
 
const Error = () => {
    return(
        <center>
        <section className="error-page">
            <div className="container">
                <h1 className="error">404</h1>
                <h2>We are sorry, the page you requested could not be found</h2>
                <div className="button">
                <NavLink to="/"><button className="btn">Back Home</button></NavLink>
                <NavLink to="/contact"><button className="btn">Report problem</button></NavLink>
                </div>
            </div>
        </section>
        </center>
    );

};

export default Error;