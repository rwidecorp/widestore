import React, {useEffect, useRef, useState} from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [displayForm, setDisplayForm] = useState(true);
  const [currName, setCurrName] = useState('');
  const [currEmail, setCurrEmail] = useState('');
  const [currMsg, setCurrMsg] = useState('');
  const [currSubject, setCurrSubject] = useState('');

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // if (currName && currEmail && currSubject && currMsg) {
    emailjs
      .sendForm(
        'service_nhtdkd9',
        'template_fj1v4sv',
        form.current,
        'Vcxxm7TmIw8Y-KhsU',
      )
      .then(
        (result) => {
          console.log(result.text);
          setDisplayForm(false);
        },
        (error) => {
          console.log(error.text);
        },
      );
    // }
  };

  return displayForm ? (
    <div className="form-div">
      <h1>Contact Support</h1>
      <form className="form" ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input
          required
          type="text"
          name="name"
          style={{border: 'none'}}
          onChange={(text) => setCurrName(text)}
        />
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          style={{border: 'none'}}
          onChange={(text) => setCurrEmail(text)}
        />
        <label style={{marginBottom: '4px'}}>Topic</label>
        <select
          name="subject"
          required
          style={{
            fontFamily: 'Helvetica, Arial, Lucida Grande, sansSerif',
            boxSizing: 'border-box',
            height: '35px',
            borderRadius: '4px',
            border: 'none',
            padding: '6px',
            fontSize: '16px',
            marginBottom: '6px',
          }}
        >
          <option value="" disabled selected>
            Choose One
          </option>
          <option value="Shipping">Shipping</option>
          <option value="Received broken items">Received broken items</option>
          <option value="Items missing from order">
            Items missing from order
          </option>
          <option value="Other">Other</option>
        </select>
        {/* <input
          required
          type="text"
          name="subject"
          style={{border: 'none'}}
          onChange={(text) => setCurrSubject(text)}
        /> */}
        <label style={{marginBottom: '6px'}}>Message</label>
        <textarea
          required
          maxLength={500}
          style={{
            fontFamily: 'Helvetica, Arial, Lucida Grande, sansSerif',
            boxSizing: 'border-box',
            resize: 'none',
            height: '250px',
            borderRadius: '4px',
            border: 'none',
            padding: '6px',
            fontSize: '16px',
          }}
          name="message"
          onChange={(text) => setCurrMsg(text)}
        />

        <input
          type="submit"
          value="Send"
          className="button-reset collections-card-atc-btn"
          style={{marginTop: '12px'}}
        />
      </form>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '64px',
      }}
    >
      <p>
        Thanks for contacting support. Keep an eye on your inbox for a response!
      </p>
    </div>
  );
};

// import React from 'react';

// function Contact() {
//   return <div>support@widecorpus.com</div>;
// }

export default Contact;
