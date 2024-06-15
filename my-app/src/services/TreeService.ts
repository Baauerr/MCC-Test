import { NodeModel } from "./NodeModel";

export function addNode(nodeArray: NodeModel[], id: string, newElement: NodeModel): boolean {
    if (id === "0") {
        nodeArray.push(newElement);
        return true;
    }
    for (const node of nodeArray) {
        if (node.id === id) {
            node.nodes.push(newElement);
            return true;
        } else if (node.nodes.length > 0) {
            if (addNode(node.nodes, id, newElement)) {
                return true;
            }
        }
    }
    return false;
}

export function removeNode(nodeArray: NodeModel[], id: string): boolean {
    for (let i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].id === id) {
            nodeArray.splice(i, 1);
            return true;
        } else if (nodeArray[i].nodes.length > 0) {
            if (removeNode(nodeArray[i].nodes, id)) {
                return true;
            }
        }
    }
    return false;
}

export function changeNodeName(nodeArray: NodeModel[], id: string, name: string): boolean {
    for (const node of nodeArray) {
        if (node.id === id) {
            node.name = name;
            return true;
        } else if (node.nodes.length > 0) {
            if (changeNodeName(node.nodes, id, name)) {
                return true;
            }
        }
    }
    return false;
}

export function getNameFromSelectedNode(nodeArray: NodeModel[], id: string): string | undefined {
    for (const node of nodeArray) {
        if (node.id === id) {
            return node.name;
        } else if (node.nodes.length > 0) {
            const foundName = getNameFromSelectedNode(node.nodes, id);
            if (foundName) {
                return foundName;
            }
        }
    }
    return undefined;
}