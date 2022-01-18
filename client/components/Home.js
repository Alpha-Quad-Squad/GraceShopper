import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import ManyProducts from "./ManyProducts";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => {
    return state.auth.username;
  });

  return (
    <div>
      <ManyProducts />
    </div>
  );
};

export default Home;
