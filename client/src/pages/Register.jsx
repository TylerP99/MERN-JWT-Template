import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


import {FaUser} from "react-icons/fa";

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  })

  const {email, password, password2} = formData;

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if(!email) errors.push("Email field is required");

    if(!password) errors.push("Password is required");

    if(password !== password2) errors.push("Passwords must match");

    if(errors.length) return;

    const userData = {
      email,
      password,
      password2,
    }

    //dispatch(registerUser(userData));
  }

  return (
    <div>
      <h1>Register <FaUser/></h1>
      <form>

      <section>
          <label
          htmlFor="email"
          >Email</label>
          <input 
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={onChange}
          />
        </section>

        <section>
          <label
          htmlFor="password"
          >Password</label>
          <input 
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={onChange}
          />
        </section>

        <section>
          <label
          htmlFor="password2"
          >Confirm Password</label>
          <input 
          name="password2"
          id="password2"
          type="password"
          value={password2}
          onChange={onChange}
          />
        </section>

      </form>
    </div>
  )
}

export default Register