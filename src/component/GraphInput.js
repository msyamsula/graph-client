import React from "react"

let GraphInput = (props) => {

    let style = {
        ...props.style, ...{
            display: "grid",
            gridTemplateRows: "2fr 6fr 6fr"
        }
    }

    let textStyle = {
        gridRows: "1/2"
    }

    let buttonStyle = {
        gridRows: "3/4",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 4fr",
        columnGap: "10px",
        padding: "10px"
    }

    let inputStyle = {
        overflow: "auto",
        height: "400px",
        border: "black solid 1px",
        margin: "10px",
        // position: "fixed",
        // top: 0,
        // bottom: 0
    }

    let inputBoxStyle = {
        display: "grid",
        gridTemplateColumns: "3fr 1fr 3fr",
        width: "100%",
        height: "9%",
        height: "20px",
        justifyContent: "center",
        margin: "20px 0px",
    }


    let toTextStyle = {
        gridColumn: "2/3",
        margin: 0,
        padding: 0,
        justifySelf: "center",
    }

    let fromInputBoxStyle = {
        justifySelf: "center",
        gridColumn: "1/2",
        width: "80%",
        height: "100%",
        padding: 0,
        margin: 0
    }

    let toInputBoxStyle = {
        gridColumn: "3/4",
        width: "80%",
        height: "100%",
        padding: 0,
        margin: 0,
        justifySelf: "center",
    }

    let controlButtonSytle = {
        height: "30px",
    }

    let symbol = (props.isBidirectional) ? "<->" : "->"

    let conditionalRender = (edges) => {
        if (edges.length == 0){
            return (
                <div style={{padding:"20px", textAlign: "center"}}>click add button or upload a file</div>
            )
        } else {
            let dom = edges.map((e, idx) => {
                let pf = e.from == "" ? "from" : e.from
                let pt = e.to == "" ? "to" : e.to
                return (
                    <div key={`${idx}`} style={inputBoxStyle}>
                        <input className={`f${idx}`} onChange={props.handleWriteEdge} style={fromInputBoxStyle} placeholder={pf}></input>
                        <p style={toTextStyle}>{symbol}</p>
                        <input className={`t${idx}`} onChange={props.handleWriteEdge} style={toInputBoxStyle} placeholder={pt}></input>
                    </div>
                )
            })

            return dom
        }
    }

    return (
        <div style={style}>
            <div style={{ textAlign: "center", width: "100%", ...textStyle }}>
                <div>please enter your graph</div>
                <br/>
                <input checked={props.isWeighted} onChange={props.handleWeighted} type="checkbox" id="isWeighted" name="isWeighted" value="on"></input>
                <label htmlFor="isWeighted">weighted graph</label><br/>
                <input onChange={props.handleBidirectional} checked={props.isBidirectional} type="checkbox" id="isBidrectional" name="isBidirectional" value="on"></input>
                <label htmlFor="isBidirectional">bidirectional</label><br/>
            </div>
            <div style={inputStyle} id="inputGraph">
                {conditionalRender(props.edges)}
            </div>
            <div style={buttonStyle}>
                <input onChange={props.handleFile} type="file" style={{width: "100%", gridColumn: "1/3"}}></input>
                <button style={controlButtonSytle} onClick={props.handleAddEdge}>add</button>
                <button style={controlButtonSytle} onClick={props.handleCreateGraph}>create</button>
                <button style={controlButtonSytle} onClick={props.handleDeleteEdge}>delete</button>
                <button style={controlButtonSytle} onClick={props.handleStart}>start</button>
            </div>
        </div>
    )

}

export default GraphInput