import './graphAlgorithm.css'

let GraphAlgorithm = (props) => {
    let conditionalRender = () => {
        if (props.algo === "dfs" || props.algo === "bfs") {
            return (
                <div className='algorithmControl'>
                    <div>
                        <input onChange={props.handleStartNode} type="text" id="startNode" placeholder="enter start node"></input>
                        <input onChange={props.handleEndNode} type="text" id="endNode" placeholder="enter end node"></input>
                        <button onClick={props.handleStart}>Start</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="algorithmBoard">
            <div className='algorithmChoices'>
                <button className={(props.algo === "dfs") ? "activeAlgorithm" : ""} onClick={props.handleDFS}>dfs (path finding)</button>
                <button className={(props.algo === "bfs") ? "activeAlgorithm" : ""} onClick={props.handleBFS}>bfs (path finding)</button>
                <button className={(props.algo === "ap") ? "activeAlgorithm" : ""} onClick={props.handleAP}>articulation point</button>
                <button className={(props.algo === "bridge") ? "activeAlgorithm" : ""} onClick={props.handleBridge}>bridge</button>
                <button className={(props.algo === "ep") ? "activeAlgorithm" : ""} onClick={props.handleEP}>euler path</button>
                <button className={(props.algo === "scc") ? "activeAlgorithm" : ""} onClick={props.handleScc}>strongly connected group</button>
            </div>
            {conditionalRender()}
        </div>
    )
}

export default GraphAlgorithm