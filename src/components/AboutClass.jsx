import React from "react";
import User from "./User.jsx";
import UserClass from "./UserClass.jsx";

class About extends React.Component {
  constructor(props) {
    super(props);
    // console.log("About component constructor called");
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    // console.log("About componentDidMount called");
    const response = await fetch("https://api.github.com/users/rupesh-ranjan");
    const data = await response.json();
    this.setState({
      userInfo: data,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("From Update", prevProps);
    // console.log("From Update", prevState);
    // console.log("From didUpdate", this.state.userInfo);
    // console.log("About componentDidUpdate called");
  }

  componentWillUnmount() {
    // console.log("About componentWillUnmount called");
  }
  render() {
    // console.log("About component render method called");
    const { name, location } = this.state?.userInfo || {};
    return (
      <>
        <h1>About Us</h1>
        <div className="about-page">
          {/* <User name={"Rupesh Ranjan"} /> */}
          <UserClass name={name} location={location} />
        </div>
      </>
    );
  }
}
export default About;
