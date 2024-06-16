import { NodeModel } from "./NodeModel";

export interface NodeProps {
    id: string;
    name: string;
    nodes: NodeModel[];
    setClicked: (id: string) => void;
    selectedId: string | null; 
}