import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
interface Iprops {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
 
const Modal:FC<Iprops> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
 
    return createPortal(
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div onClick={(event) => event.stopPropagation()}
                style={{
                    background: "white",
                    width: 300,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                {children}
            </div>
        </div>,
        document.getElementById('model-popup') as HTMLElement
    );
};
 
export default Modal;