import React from "react";
import RGraph from "react-graph-vis";


let Graph = (props)=> {
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
      <RGraph
        style={props.style}
        graph={props.graph}
        options={options}
      ></RGraph>
    )
}

export default Graph
