import React, { Component, useEffect, useState } from "react";
// import "./MyGraph.css";
import RGraph from "react-graph-vis";
// import background3 from "./background3.jpeg";
// import GraphInput from "../component/graphInput";
// import GraphAlgorithm from "../component/graphAlgorithm";


let Graph = (props)=> {
    let options = {
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          nodeSpacing: 200,
        },
      },
      edges: {
        color: "#000000"
      },
      // autoResize: true,
      height: "100%",
      physics: {
        stabilization: {
          enabled: true,
          iterations: 5,
        }
      }
    }

    return (
      <RGraph
        style={props.style}
        graph={props.graph}
        options={options}
      ></RGraph>
    )
}

export default Graph
