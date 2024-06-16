import { addNode, changeNodeName, getNameFromSelectedNode, removeNode } from "../services/TreeService"
import { useEffect, useRef, useState } from "react"
import { Tree } from "../components/Node"
import { GenerateId } from "../services/IdGenerator"
import { NodeModel } from "../services/NodeModel"
import { Modal } from "../components/ModalWindow"

import "./mainPage.css"

export const MainPage: React.FC = () => {

    const [treeData, setTreeData] = useState<NodeModel[]>([])
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setClickedId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
    }, []);

    const handleAddNode = (name: string, parentId: string) => {

        const newNode: NodeModel = {
            id: GenerateId(),
            name: name,
            nodes: []
        };

        let updatedTree = [...treeData];
        addNode(updatedTree, parentId, newNode)
        setTreeData(updatedTree);
    };

    const handleEditNode = (name: string, parentId: string) => {
        let updatedTree = [...treeData];
        changeNodeName(updatedTree, parentId, name)
        setTreeData(updatedTree);
        setClickedId(null)
    };

    const handleRemoveNode = () => {
        let updatedTree = [...treeData];
        if (clickedId) {
            removeNode(updatedTree, clickedId)
            setTreeData(updatedTree);
            setClickedId(null)
        }
    };

    const handleClear = () => {
        let updatedTree = [...treeData];
        updatedTree.splice(0, updatedTree.length)
        setTreeData(updatedTree);
        setClickedId(null);
    };

    const handleClickOnNode = (id: string) => {
        setClickedId(id);
    };

    return (

        <div id={"main-сard"} onClick={(e) => e.stopPropagation()}>
            <header id={"header-place"}>
                Tree
            </header>
            <div ref={cardRef} id="nodes-place">
                {treeData.map(child =>
                    <Tree
                        key={child.id}
                        id={child.id}
                        name={child.name}
                        nodes={child.nodes}
                        setClicked={handleClickOnNode}
                        selectedId={clickedId} />
                )}
            </div>
            <footer id={"buttons-place"}>
                <button onClick={handleRemoveNode}>Delete</button>
                <button onClick={handleOpenEditModal}>Edit</button>
                <button onClick={handleOpenAddModal}>Add</button>
                <button onClick={handleClear}>Clear</button>
                {clickedId !== null && showEditModal && (
                    <Modal
                        show={showEditModal}
                        handleClose={handleCloseEditModal}
                        handleAction={handleEditNode}
                        buttonText="Change"
                        name={getNameFromSelectedNode(treeData, clickedId)}
                        title="Edit node"
                        id={clickedId}
                    />
                )}
                {showAddModal && (
                    <Modal
                        show={showAddModal}
                        handleClose={handleCloseAddModal}
                        handleAction={handleAddNode}
                        title="Add new node"
                        buttonText="Add"
                        name=""
                        id={clickedId !== null ? clickedId : "0"}
                    />)}
            </footer>
        </div>
    )
}

