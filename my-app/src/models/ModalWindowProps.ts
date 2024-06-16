export interface ModalWindowProps {
    title: string
    buttonText: string
    show: boolean,
    id: string,
    name: string
    handleClose: () => void
    handleAction: (name: string, id: string) => void
}