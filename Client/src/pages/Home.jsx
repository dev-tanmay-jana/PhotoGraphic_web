

const Home = () => {
  return (<>
        <main>
            <section className="container home section1">
                <div className="home_container">
                    <div className="home-content">
                        <h1>Welcome to Our Website</h1>
                        <p>Your gateway to amazing services and products.This setup gives you full control over the sidebar using React state, and avoids Bootstrap’s collapse behavior entirely. Let me know if you want to add a backdrop, swipe gesture, or animation effects </p>
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
        <section className="section2-analytics">
            <div className="container grid grid-four-columns">
                <div className="section2_content1">
                    <h2>10+ </h2>
                    <p>Projects Completed</p>
                </div>
                <div className="section2_content1">
                    <h2>50+ </h2>
                    <p>Prgrammer</p>
                </div>
                <div className="section2_content1">
                    <h2>10,000</h2>
                    <p>subscribers</p>
                </div>
                <div className="section2_content">
                    <h2>24/7</h2>
                    <p>services</p>
                </div>
            </div>
        </section>
        <section className="container section3">
                <div className="home_container grid grid-two-column">
                    <div className="image">
                        <img src="/homepage2.jpg" alt="Home" className="home-image"/>
                    </div>
                    <div className="home-content">
                        <h1>Want To Contact?</h1>
                        <p>Your gateway to amazing services and products.
                        We’re here to help you bring your ideas to life. Whether you’re looking for expert advice, personalized solutions, our team is ready to connect with you.
                        Reach out to us for collaborations. We value every conversation and strive to respond with clarity, care, and speed. Your satisfaction is our priority.
                        </p>
                        <div className="button">
                            <a href="/contact"><button className="btn secondery">Contact</button></a>
                            <a href="/about" ><button className="btn secondery">lern More</button></a>
                        </div>
                    </div>
                    {/* You can add an image or illustration here */}
            
                </div>
            </section>
    </>
  );
}

export default Home;