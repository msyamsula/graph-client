import axios from "axios"
import { backendURL } from "./utility"

export let solveDFS = async (graph, start, end, algo) => {
    // graph.start = start
    // graph.end = end
    let config = {
        method: "post",
        url: `${backendURL}/graph/${algo}`,
        data: {
            "nodes": graph.nodes,
            "edges": graph.edges,
            "start": start,
            "end": end
        }
    }

    let response = await axios(config)

    return response.data
}