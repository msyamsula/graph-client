import React from "react"

let GraphInput = (props) => {

    let style = {
        ...props.style, ...{
            display: "grid",
            gridTemplateRows: "1fr 10fr 3fr"
        }
    }

    let textStyle = {
        gridRows: "1/2"
    }

    let buttonStyle = {
        gridRows: "3/4",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "10px"
    }

    let inputStyle = {
        overflow: "scroll",
    }

    let inputBoxStyle = {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 2fr",
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

    return (
        <div style={style}>
            <div style={{ textAlign: "center", width: "100%", ...textStyle }}>please enter your graph</div>
            <div style={inputStyle}>
                {props.edges.map((e, idx) => {
                    return (
                        <div key={`${idx}`} style={inputBoxStyle}>
                            <input className={`f${idx}`} onChange={props.handleWriteEdge} style={fromInputBoxStyle} placeholder="from"></input>
                            <p style={toTextStyle}>to </p>
                            <input className={`t${idx}`} onChange={props.handleWriteEdge} style={toInputBoxStyle} placeholder="to"></input>
                        </div>
                    )
                })}
            </div>
            <div style={buttonStyle}>
                <button style={{ height: "30px" }} onClick={props.handleAddEdge}>add</button>
                <button style={{ height: "30px" }} onClick={props.handleCreateGraph}>create</button>
                <button style={{ height: "30px" }} onClick={props.handleDeleteEdge}>delete</button>
                <button style={{ height: "30px" }} onClick={props.handleStart}>start</button>
            </div>
        </div>
    )

}

export default GraphInput