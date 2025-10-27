import { useAuth } from "../store/auth";

const About = () => {

    const {user} = useAuth();

  return (
    <main>
            <section className="container home section1">
                <div className="home_container">
                   
                    <div className="home-content">
                        <h2>Hii, {user?.username || "Guest"}</h2>
                        <h1>Why Choose Us?</h1>
                            <p>Your gateway to amazing services and products. We combine intuitive design with powerful functionality to deliver seamless user experiences across every device.
                            We prioritize flexibility and customization. Whether you want to add a backdrop, swipe gesture, or animation effects, our architecture is built to adapt and scale with your vision.
                            Choosing us means choosing a team that values clarity, efficiency, and creativity. We’re not just developers — we’re problem solvers, designers, and collaborators committed to helping you build something exceptional.</p>
                        <div className="button">
                            <a href="/about"><button className="btn secondery">About Us</button></a>
                            <a href="/service" ><button className="btn secondery">Lern More</button></a>
                        </div>
                    </div>
                    {/* You can add an image or illustration here */}
                    <div className="image">
                        <img src="/homepage.jpg" alt="Home" className="home-image"/>
                    </div>
                </div>
            </section>
        </main>
  );
}

export default About;