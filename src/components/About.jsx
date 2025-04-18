import User from "./User";
import UserClass from "./UserClass.jsx";

function About() {
  return (
    <>
      <h1>About Us</h1>
      <div className="about-page">
        <User name={"Rupesh Ranjan"} />
        <UserClass name={"Rupesh Ranjan"} location={"Hyderabad"} />
      </div>
    </>
  );
}

export default About;
