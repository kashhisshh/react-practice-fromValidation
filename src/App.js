import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  function validateForm() {
    const errors = { name: '', email: '' };
    let isValid = true;

    if (!form.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!form.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email is not valid';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log(form);
  }

  return (
    <div>
      <form>
        <div>
          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
