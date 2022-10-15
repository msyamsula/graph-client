import React, { Component, useEffect, useState } from "react";
// import "./MyGraph.css";
// import Graph from "react-graph-vis";
// import background3 from "./background3.jpeg";
import GraphInput from "../component/GraphInput";
import GraphAlgorithm from "../component/GraphAlgorithm";
import Graph from "../component/Graph";


class MyGraph extends React.Component {
  constructor(props) {
    super(props)
    this.style = {
      height: "100vh",
      width: "100vw",
      display: "grid",
      gridTemplateColumns: "1fr 4fr",
      gridTemplateRows: "1fr 8fr",
      // padding: "10px",
      margin: 0,
    }

    this.graphInputSytle = {
      gridColumn: "1/2",
      gridRow: "2/3"
    }

    this.graphAlgorithmStyle = {
      gridColumn: "1/3",
      gridRow: "1/2"
    }

    this.state = {
      graph: {
        nodes: [],
        edges: []
      },
      edges: [],
      isValid: false

    }
  }

  createNode = (edges) => {
    let nodes = new Map()

    for (let i=0; i<edges.length; i++){
      nodes.set(edges[i].to, true)
      nodes.set(edges[i].from, true)
    }
    let graphNodes = []
    for (let [key, value] of nodes) {
      let n = {
        id: key,
        label: key
      }
      graphNodes.push(n)
    }

    return graphNodes
  }

  componentDidMount = async () => {
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

    await this.setState({ graph })
  }

  handleClick = async (e) => {
    e.preventDefault()

    let graph = structuredClone(this.state.graph)
    graph.nodes[0].color.background = "purple"
    graph.nodes[1].color.background = "purple"
    await this.setState({ graph })
  }

  handleAddEdge = async (e) => {
    e.preventDefault()
    let edges = structuredClone(this.state.edges)
    edges = [...edges, { to: "", from: "" }]
    await this.setState({ edges })
  }

  handleDeleteEdge = async (e) => {
    e.preventDefault()
    let edges = structuredClone(this.state.edges)
    edges.pop()
    console.log(edges);
    await this.setState({ edges })
  }

  handleWriteEdge = async (e) => {
    e.preventDefault()
    let c = e.target.className
    let value = e.target.value

    let idx = parseInt(c.substr(1))
    let type = c[0]

    let edges = structuredClone(this.state.edges)

    if (type == 'f') {
      edges[idx].from = value
    } else if (type == 't'){
      edges[idx].to = value
    }

    await this.setState({edges})
  }

  handleCreateGraph = async (e) => {
    e.preventDefault()
    console.log(this.state.edges);
    let edges = structuredClone(this.state.edges)
    let nodes = this.createNode(edges)

    let graph = structuredClone(this.state.graph)
    graph.nodes = nodes
    graph.edges = edges

    await this.setState({graph})
    console.log(this.state.graph);
  }

  handleStart = async (e) => {
    e.preventDefault()

    let graph = structuredClone(this.state.graph)
    graph.nodes[0].color = "purple"
    graph.nodes[1].color = "red"

    await this.setState({graph})
  }


  render() {
    return (
      <div style={this.style}>
        <Graph style={{}} graph={this.state.graph}></Graph>
        <GraphInput
          style={this.graphInputSytle}
          edges={this.state.edges}
          handleAddEdge={this.handleAddEdge}
          handleDeleteEdge={this.handleDeleteEdge}
          handleWriteEdge={this.handleWriteEdge}
          handleCreateGraph={this.handleCreateGraph}
          handleStart={this.handleStart}
        ></GraphInput>
        <GraphAlgorithm style={this.graphAlgorithmStyle}></GraphAlgorithm>
      </div>
      // <Graph
      //   // style={{backgroundColor: "black"}}
      //   graph={this.state.graph}
      //   options={this.options}
      // ></Graph>
      // <div>
      // </div>
    )
  }
}

export default MyGraph
