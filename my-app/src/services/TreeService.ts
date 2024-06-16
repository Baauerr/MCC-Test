import { NodeModel } from "./NodeModel";

export function addNode(nodeArray: NodeModel[], id: string, newElement: NodeModel) {
    if (id === "0") {
        nodeArray.push(newElement)
    }
    else {
        let node = findNode(nodeArray, id)
        node?.nodes.push(newElement)
    }
}

export function changeNodeName(nodeArray: NodeModel[], id: string, name: string) {
    let node = findNode(nodeArray, id)
    if (node) {
        node.name = name
    }
}

export function getNameFromSelectedNode(nodeArray: NodeModel[], id: string): string {
    let node = findNode(nodeArray, id)
    return node?.name ? node?.name : "";
}

export function removeNode(nodeArray: NodeModel[], id: string) {
    for (let i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].id === id) {
            nodeArray.splice(i, 1);
        } else if (nodeArray[i].nodes.length > 0) {
            removeNode(nodeArray[i].nodes, id)
        }
    }
}

export function findNode(nodeArray: NodeModel[], id: string): NodeModel | undefined {
    for (const node of nodeArray) {
        if (node.id === id) {
            return node;
        } else if (node.nodes.length > 0) {
            const foundNode = findNode(node.nodes, id);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return undefined;
}