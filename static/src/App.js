import React from "react";
import Login from "./components/login/login";
import ManageTodo from "./components/todo/manage-todo";
import { connect } from "react-redux";

const App = (props) => {
  const userDetails = props.userData;
  return (
    <div className="container">
      {userDetails && Object.keys(userDetails).length ? (
        <ManageTodo userDetails={userDetails} />
      ) : (
        <Login />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userReducers.userData,
});

export default connect(mapStateToProps, null)(App);
