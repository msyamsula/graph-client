let GraphAlgorithm = (props) => {
    let style = {
        ...props.style, ...{
            textAlign: "center",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            rowGap: "10px"
        }
    }

    let algorithmChoiceStyle = {
        gridColumn: "1/3",
        gridRows: "1/2",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
    }
    
    let algoButtonStyle = {
        width: "50%",
        alignSelf: "center",
        justifySelf: "center"
    }

    let startEndNodeStyle = {
        gridColumn: "1/3",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "center"
    }

    let nodeInputStyle = {
        width: "50%",
        justifySelf: "center"
    }

    let conditionalRender = () => {
        if (props.algo == "dfs" || props.algo == "bfs"){
            return (
                <div style={startEndNodeStyle}>
                    <input onChange={props.handleStartNode} style={nodeInputStyle} type="text" id="startNode" placeholder="enter start node"></input>
                    <input onChange={props.handleEndNode} style={nodeInputStyle} type="text" id="endNode" placeholder="enter end node"></input>
                </div>
            )
        }
    }

    return (
        <div style={style}>
            <div style={algorithmChoiceStyle}>
                <button onClick={props.handleDFS} style={algoButtonStyle}>dfs (path finding)</button>
                <button onClick={props.handleBFS} style={algoButtonStyle}>bfs (path finding)</button>
            </div>
            {conditionalRender()}
        </div>
    )
}

export default GraphAlgorithm