function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
