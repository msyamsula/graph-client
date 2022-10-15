import React, { Component, useEffect, useState } from "react";
// import "./MyGraph.css";
import RGraph from "react-graph-vis";
// import background3 from "./background3.jpeg";
// import GraphInput from "../component/graphInput";
// import GraphAlgorithm from "../component/graphAlgorithm";


let Graph = (props)=> {
    let graph = {
      nodes: [
        {
          id: 1, label: "Node 1", title: "node 1 tootip text",
          color: {
            background: "white",
            border: "red"
          },
          font: {
            color: "green"
          }
        },
        {
          id: 6, label: "Node 6", title: "node 1 tootip text",
          color: {
            background: "white",
            border: "red"
          },
          font: {
            color: "green"
          }
        },
        {
          id: 7, label: "Node 7", title: "node 1 tootip text",
          color: {
            background: "white",
            border: "red"
          },
          font: {
            color: "green"
          }
        },
        { id: 2, label: "Node 2", title: "node 2 tootip text" },
        { id: 3, label: "Node 3", title: "node 3 tootip text" },
        { id: 4, label: "Node 4", title: "node 4 tootip text" },
        { id: 5, label: "Node 5", title: "node 4 tootip text" },
        { id: 8, label: "Node 8", title: "node 5 tootip text" },
        { id: 9, label: "Node 9", title: "node 5 tootip text" },
        { id: 10, label: "Node 10", title: "node 5 tootip text" },
        { id: 11, label: "Node 11", title: "node 5 tootip text" },
        { id: 12, label: "Node 12", title: "node 5 tootip text" },
        { id: 13, label: "Node 13", title: "node 5 tootip text" },
        { id: 14, label: "Node 14", title: "node 5 tootip text" },
        { id: 15, label: "Node 15", title: "node 5 tootip text" }
      ],
      edges: [
        { from: 1, to: 2 },
        {
          from: 1, to: 3, color: {
            color: "red"
          }
        },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 5 },
        { from: 1, to: 5 },
        { from: 2, to: 7 },
        { from: 3, to: 8 },
        { from: 10, to: 15 },
        { from: 9, to: 12 },
        { from: 6, to: 5 },
        { from: 13, to: 14 },
        { from: 3, to: 10 },
        { from: 12, to: 2 },
        { from: 14, to: 7 },
        { from: 11, to: 4 },
        { from: 15, to: 6 },
        { from: 6, to: 13 },
        { from: 9, to: 8 },
        { from: 4, to: 1 },
      ]
    }

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
          // enabled: true,
          // iterations: 10,
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
