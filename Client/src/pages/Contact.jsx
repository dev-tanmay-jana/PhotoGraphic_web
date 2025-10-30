import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContact = {
  name: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [contact, setContact] = useState(defaultContact);
  const { user,API } = useAuth();

  // Prefill form with user data
  useEffect(() => {
    if (user && typeof user === 'object') {
      setContact({
        name: user.username || "",
        email: user.email || "",
        message: contact.message || ""
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting contact:", contact);

    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();
      
      if (response.ok) {
        setContact(defaultContact);
        toast.success("Message sent successfully");
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
        toast.error("Error submitting contact form: " + error.message);
    }
  };

  return (
    <section className="contact">
      <main>
        <div className="container">
          <h1>Contact with us</h1>
          <div className="two_boxes">
            <div className="form">
              <form onSubmit={handleSubmit} method="POST" className="contact_form" id="contact-form">
                <div className="form_group">
                  <label htmlFor="name">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      placeholder="User name"
                      value={contact.name}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="form_group">
                  <label htmlFor="email">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder="Enter your Email"
                      value={contact.email}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="form_group">
                  <label htmlFor="message">
                    <textarea
                      name="message"
                      id="message"
                      autoComplete="off"
                      placeholder="Enter your comment"
                      value={contact.message}
                      onChange={handleInput}
                      required
                    ></textarea>
                  </label>
                </div>
                <br />
                <button type="submit" className="signup_btn">Submit</button>
              </form>
            </div>
            <div className="image">
                <img src="\loginpage.jpg" alt="login" className="pic" />
            </div>
          </div>
          <div className="location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1048.9204117586323!2d87.86035544495027!3d22.038441746415675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1759945586295!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Contact;