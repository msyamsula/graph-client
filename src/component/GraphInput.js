import React from "react"
import "./graphInput.css"

let GraphInput = (props) => {

    let symbol = (props.isBidirectional) ? "<->" : "->"

    let conditionalRender = (edges) => {
        if (edges.length === 0) {
            return (
                <div class="graphBox">click add button or upload a file</div>
            )
        } else {
            let dom = edges.map((e, idx) => {
                let pf = e.from === "" ? "from" : e.from
                let pt = e.to === "" ? "to" : e.to
                return (
                    <div key={`${idx}`} className="singleEdge">
                        <input className={`f${idx} fromBox`} onChange={props.handleWriteEdge} placeholder={pf}></input>
                        <p>{symbol}</p>
                        <input className={`t${idx} toBox`} onChange={props.handleWriteEdge} placeholder={pt}></input>
                    </div>
                )
            })

            return <div className="graphBox">{dom}</div>
        }
    }

    return (
        <div className="graphInput">
            <div>
                <div className="pleaseEnterYourGraph">please enter your graph</div>
                <br />
                {/* <input checked={props.isWeighted} onChange={props.handleWeighted} type="checkbox" id="isWeighted" name="isWeighted" value="on"></input> */}
                {/* <label htmlFor="isWeighted">weighted graph</label><br/> */}
                <input onChange={props.handleBidirectional} checked={props.isBidirectional} type="checkbox" id="isBidrectional" name="isBidirectional" value="on"></input>
                <label htmlFor="isBidirectional">bidirectional</label><br />
            </div>
            <div className="controlButton">
                <button onClick={props.handleAddEdge}>add</button>
                <button onClick={props.handleCreateGraph}>create</button>
                <button onClick={props.handleDeleteEdge}>delete</button>
            </div>
            <div id="inputGraph">
                {conditionalRender(props.edges)}
            </div>
            <input onChange={props.handleFile} type="file" style={{ width: "100%", gridColumn: "1/3" }}></input>
        </div>
    )

}

export default GraphInput