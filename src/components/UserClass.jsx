import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count1: 0,
      count2: 1,
    };
    // console.log(this.props.name, "UserClass constructor called");
  }

  componentDidMount() {
    // console.log(this.props.name, "UserClass componentDidMount called");
  }

  render() {
    // console.log(this.props.name, "UserClass render method called");
    const { name, location } = this.props;
    const { count1, count2 } = this.state;
    return (
      <div className="user-card">
        <h1>
          Count: {count1} {count2}
        </h1>
        <button
          onClick={() => this.setState({ count1: this.state.count1 + 1 })}
        >
          Count Increase
        </button>

        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: 9110145120</h4>
      </div>
    );
  }
}

export default UserClass;
