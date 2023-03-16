import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ALERT_VARIANTS } from "../../types/common";

interface IAlertProps {
  message: string;
  variant: ALERT_VARIANTS;
  onClose?: () => void;
}

function Alert({ message, variant, onClose }: IAlertProps) {
  return (
    <div className={`alert ${variant} shadow-lg mb-10`}>
      <div>
        {variant === ALERT_VARIANTS.SUCCESS ?
          <CheckCircleIcon className="h-5 w-6" /> :
          variant === ALERT_VARIANTS.WARNING ?
            <ExclamationTriangleIcon className="h-5 w-6" /> :
            variant === ALERT_VARIANTS.ERROR ?
              <XCircleIcon className="h-5 w-6"/> :
              <InformationCircleIcon className="h-5 w-6"/>
        }
        <span>{message}</span>
      </div>
      { onClose && 
        <div className="flex-none">
          <button className="btn btn-sm btn-circle" onClick={onClose}>X</button>
        </div>
      }
    </div>
  )
}

export default Alert