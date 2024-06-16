import { NodeModel } from "../services/NodeModel"
import './node.css';

interface NodeProps {
    id: string;
    name?: string;
    nodes: NodeModel[];
    setClicked: (id: string) => void;
    selectedId: string | null; 
}

export const Tree: React.FC<NodeProps> = ({ id, name, nodes, setClicked, selectedId }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setClicked(id);
    };

    return (
        <div className={`card ${id === selectedId ? 'selected' : ''}`} onClick={handleClick}>
            {name}
            <div>
                {nodes.map(child => (
                    <Tree
                        key={child.id}
                        id={child.id}
                        name={child.name}
                        nodes={child.nodes}
                        setClicked={setClicked}
                        selectedId={selectedId} 
                    />
                ))}
            </div>
        </div>
    );
};