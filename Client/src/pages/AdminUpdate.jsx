import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const AdminUpdate = () => {
    const { AuthorizationToken } = useAuth();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() =>{
    // get user by id
    const getUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000/admin/users/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: AuthorizationToken,
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const user = await response.json();
                // map backend fields to local state. backend may return `username` instead of `name`.
                setData({
                    name: user.username ?? user.name ?? "",
                    email: user.email ?? "",
                    phone: user.phone ?? ""
                });
                
            } catch (error) {
                console.error("Error fetching user:", error);
                toast.error("Error fetching user data");
            } finally {
                setLoading(false);
            }
        };
    getUserData();
    },[params.id, AuthorizationToken]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  //update user by id
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/admin/users/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: AuthorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          phone: data.phone
        })
      });

      if (!response.ok) {
        const text = await response.text();
        toast.error(`Update failed ${response.status}: ${text}`);
        throw new Error(`Update failed ${response.status}: ${text}`);
      }

      const resData = await response.json();
    //   console.log('User updated:', resData);
      toast.success('User updated successfully');
      // optionally navigate back or show success
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    } finally {
      setLoading(false);
    }
  };
  return (<>
  <section className="contact">
      <main>
        <div className="container">
          <h1>Update User Data</h1>
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
                      value={data.name}
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
                      value={data.email}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <div className="form_group">
                  <label htmlFor="phone">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      placeholder="Enter your phone"
                      value={data.phone}
                      onChange={handleInput}
                      required
                    />
                  </label>
                </div>
                <br />
                <button type="submit" className="signup_btn" disabled={loading}>
                  {loading ? 'Loading...' : 'Update'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
    </>
    );
};