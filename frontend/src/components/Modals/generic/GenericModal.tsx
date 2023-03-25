import { useState } from "react";

interface IModalProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

function Modal({title, subtitle, onClick}: IModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
    <input type="checkbox" id="generic-modal" data-testid='generic-modal' className="modal-toggle" onChange={e => setIsVisible(e.target.checked)} />
    {isVisible && (
      <div className="modal modal-middle">
        <div className="generic-modal bg-white relative p-5 sm:w-[40%] w-[80%]">
        <label htmlFor="generic-modal" className="btn btn-sm btn-circle absolute right-2 top-2">X</label>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{subtitle}</p>
          <div className="modal-action">
            <label htmlFor="generic-modal" className="btn" onClick={onClick}>Yes</label>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Modal