import React from "react";
import RGraph from "react-graph-vis";
import "./graph.css"


let Graph = (props) => {
  let options = {
    layout: {
      improvedLayout: true,
      hierarchical: {
        enabled: false,
      },
    },
    edges: {
      color: "#000000"
    },
    height: "100%",
    physics: {
      enabled: true,
    }
  }

  return (
    <div className="graphBoard">
      <RGraph
        graph={props.graph}
        options={options}
      ></RGraph>
    </div>
  )
}

export default Graph
