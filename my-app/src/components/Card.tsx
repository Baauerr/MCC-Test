import { NodeModel } from "../services/NodeModel"
import './card.css';

interface TreeProps {
    id: string;
    name?: string;
    nodes: NodeModel[];
    setClicked: (id: string) => void;
    selectedId: string | null; 
    toChange?: boolean; 
}

export const Tree: React.FC<TreeProps> = ({ id, name, nodes, setClicked, selectedId, toChange }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setClicked(id);
    };

    return (
        <div className={`card ${id === selectedId ? 'selected' : ''}`} onClick={handleClick}>
            {id == selectedId && toChange ? <input type="text" value={name}/> : name}
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