import React from "react";
import GraphInput from "../component/GraphInput";
import GraphAlgorithm from "../component/GraphAlgorithm";
import Graph from "../component/Graph";
import { solveDFS } from "../global/algorithm";
import './mygraph.css'


class MyGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      graph: {
        nodes: [],
        edges: []
      },
      edges: [],
      isValid: false,
      isWeighted: false,
      isBidirectional: false,
      algo: null,
      startNode: null,
      endNode: null
    }

    this.defaultNodeColor = "#D2E5FF"
    this.defaultEdgeColor = "black"
  }

  createEdgeStringNotation = (edge) => {
    let from = edge.from
    let to = edge.to

    return `${from}-${to}`
  }

  createBidirectinal = (edges) => {

    let s = new Set()
    let be = []
    for (let i=0; i<edges.length; i++){
      be = [...be, edges[i]]
      let eStr = this.createEdgeStringNotation(edges[i])
      s.add(eStr)

    }

    for (let i=0; i<edges.length; i++){
      let from = edges[i].from
      let to = edges[i].to
      let ne = {from:to, to:from}
      let neStr = this.createEdgeStringNotation(ne)
      if (s.has(neStr)) continue

      be = [...be, ne]
    }

    return be
  }

  sanitizeEdge = (edges) => {
    
    let mp = new Map()
    for (let i=0; i<edges.length; i++){
      let from = edges[i].from
      let to = edges[i].to
      if (!mp.has(from)) {
        mp.set(from, new Set())
      }
      
      let s = mp.get(from)
      s.add(to)
      mp.set(from, s)
    }

    let e = []
    for (const from of mp.keys()){
      let s = mp.get(from)
      for (const to of s.values()){
        if (from === to) continue
        e = [...e, {from:from, to:to}]
      }
    }

    return e

  }

  createNode = (edges) => {
    let nodes = new Map()

    for (let i = 0; i < edges.length; i++) {
      nodes.set(edges[i].to, true)
      nodes.set(edges[i].from, true)
    }
    let graphNodes = []
    for (let [key, value] of nodes) {
      let n = {
        id: key,
        label: key,
        color: null,
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

    let dom = document.getElementsByClassName("graphBox")
    dom[0].scrollTop = dom[0].scrollHeight
  }

  handleDeleteEdge = async (e) => {
    e.preventDefault()
    let edges = structuredClone(this.state.edges)
    edges.pop()
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
    } else if (type == 't') {
      edges[idx].to = value
    }

    await this.setState({ edges })
  }

  handleCreateGraph = async (e) => {
    e.preventDefault()
    let edges = structuredClone(this.state.edges)
    edges = this.sanitizeEdge(edges)
    let nodes = this.createNode(edges)

    let graph = structuredClone(this.state.graph)
    graph.nodes = nodes

    let biEdges = structuredClone(edges)
    biEdges = this.createBidirectinal(biEdges)
    
    graph.edges = (this.state.isBidirectional) ? biEdges : edges

    await this.setState({ graph })
  }

  coloringNode = async (id, color) => {
    let graph = structuredClone(this.state.graph)

    for (let i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[i].id == id) {
        graph.nodes[i].color = {
          background: color
        }
      }
    }
    
    await this.setState({ graph })
  }

  coloringEdge = async (from, to, color, w) => {
    let graph = structuredClone(this.state.graph)

    for (let i = 0; i < graph.edges.length; i++) {
      if (graph.edges[i].from == from && graph.edges[i].to == to) {
        graph.edges[i].color = {
          color
        }
        graph.edges[i].width = w
      }

      if (this.state.isBidirectional && graph.edges[i].from == to && graph.edges[i].to == from) {
        graph.edges[i].color = {
          color
        }
        graph.edges[i].width = w
      }
    }
    await this.setState({ graph })

  }

  validateStart = async (e) => {

    if (this.state.algo === "dfs"){
      if (this.state.startNode == "" || this.state.endNode == ""){
        alert("empty start or end node")
        return false
      }
  
      if (this.state.startNode == null || this.state.endNode == null ){
        alert("null start or end node")
        return false
      }
  
  
      if (this.state.graph.nodes.length == 0){
        alert("graph has zero node")
        return false
      }
    }


    return true
  }

  timer = (ms) => new Promise(res => setTimeout(res, ms))


  animateDFS = async (input) => {
    console.log("animating DFS");
  }

  handleStart = async (e) => {
    e.preventDefault()

    let safe = await this.validateStart()
    if (!safe){
      return
    }


    if (this.state.algo === "dfs"){
      let resp = await solveDFS(this.state.graph, this.state.startNode, this.state.endNode)
      await this.animateDFS(resp)
    }
    // let path = resp.path
    // // path = ['6', '11', '12', '10', '#10-12', '#12-11', '#11-6', '5', '2', '3', '4', '1']
    // console.log(path);
    // // let path = ["2", "3", "4", "1", "3", "5", "6", "11", "12", "10"]
    // await this.coloringNode(path[0], "red")
    // // await this.coloringEdge(path[0], path[1], "red")

    // let currentNode = path[0]
    
    // let run = async () => {
    //   for (let i = 1; i < path.length; i++) {
    //     if (path[i][0] == '#'){
    //       let substr = path[i].substring(1, path[i].length)
    //       let edges = substr.split('-')
    //       let from = edges[1]
    //       let to = edges[0]
    //       console.log(edges);
    //       await this.timer(1000)
    //       await this.coloringNode(to, this.defaultNodeColor)
    //       await this.timer(1000)
    //       await this.coloringEdge(from, to, this.defaultEdgeColor, 1)
    //       currentNode = from
    //       continue
    //     }
    //     await this.timer(1000)
    //     await this.coloringEdge(currentNode, path[i], "red", 3)
    //     await this.timer(1000)
    //     await this.coloringNode(path[i], "red")
    //     currentNode = path[i]

    //   }
    // }

    // await run()
  }

  handleWeighted = async (e) => {
    let isWeighted = e.target.checked
    await this.setState({ isWeighted })
  }

  handleBidirectional = async (e) => {
    let isBidirectional = e.target.checked
    await this.setState({ isBidirectional })
  }

  readFile = async (file) => {
    let reader = new FileReader()
    reader.onload = async (e) => {
      let doc = e.target.result
      let lines = doc.split("\n")
      let edges = []

      for (let i = 0; i < lines.length; i++) {
        let l = lines[i]
        let data = l.split(' ')
        if (i == 0) {
          let isWeighted = data[0] == '1' ? true : false
          await this.setState({ isWeighted })
          continue
        }

        if (i == 1) {
          let isBidirectional = data[0] == '1' ? true : false
          await this.setState({ isBidirectional })
          continue
        }

        let f = data[0]
        let t = data[1]

        edges.push({ from: f, to: t })
      }

      await this.setState({ edges })
    }

    await reader.readAsText(file)
  }

  handleFile = async (e) => {
    e.preventDefault()
    await this.setState({ edges: [] })
    let file = e.target.files[0]
    if (file.type != "text/plain") {
      alert("please use txt file")
      return
    }
    await this.readFile(file)
    await this.timer(1000)
    e.target.value = null
    await this.handleCreateGraph(e)
    
  }

  handleBFS = async (e) => {
    e.preventDefault()
    await this.setState({ algo: "bfs" })
  }

  handleDFS = async (e) => {
    e.preventDefault()
    await this.setState({ algo: "dfs" })
  }

  handleAP = async (e) => {
    e.preventDefault()
    await this.setState({ algo: "ap" })
  }

  handleBridge = async (e) => {
    e.preventDefault()
    await this.setState({ algo: "bridge" })
  }

  handleEP = async (e) => {
    e.preventDefault()
    await this.setState({ algo: "ep" })
  }

  handleScc = async (e) => {
    e.preventDefault()
    await this.setState({ algo: "scc" })
  }

  handleStartNode = async (e) => {
    e.preventDefault()
    let startNode = e.target.value
    await this.setState({ startNode })
  }

  handleEndNode = async (e) => {
    e.preventDefault()
    let endNode = e.target.value
    await this.setState({ endNode })
  }



  render() {
    return (
      <div className="mainPage">
        <Graph graph={this.state.graph}></Graph>
        <GraphInput
          edges={this.state.edges}
          handleAddEdge={this.handleAddEdge}
          handleDeleteEdge={this.handleDeleteEdge}
          handleWriteEdge={this.handleWriteEdge}
          handleCreateGraph={this.handleCreateGraph}
          handleWeighted={this.handleWeighted}
          handleBidirectional={this.handleBidirectional}
          isBidirectional={this.state.isBidirectional}
          isWeighted={this.state.isWeighted}
          handleFile={this.handleFile}
        ></GraphInput>
        <GraphAlgorithm
          handleDFS={this.handleDFS}
          handleBFS={this.handleBFS}
          handleAP={this.handleAP}
          handleEP={this.handleEP}
          handleBridge={this.handleBridge}
          handleScc={this.handleScc}
          algo={this.state.algo}
          handleEndNode={this.handleEndNode}
          handleStartNode={this.handleStartNode}
          handleStart={this.handleStart}
        ></GraphAlgorithm>
      </div>
    )
  }
}

export default MyGraph
