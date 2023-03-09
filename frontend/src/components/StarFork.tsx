import { GIST_UPDATE_ACTIONS } from "../types/common";
import { BarsArrowUpIcon, StarIcon } from "@heroicons/react/24/outline";

interface IStarForkProps {
  variant: GIST_UPDATE_ACTIONS;
  isChecked?: boolean;
}

function StarFork({ variant, isChecked = false }: IStarForkProps) {

  return (
    <>
      {variant === GIST_UPDATE_ACTIONS.STAR && <StarIcon className="cursor-pointer" height={20} width={20} />}
      {variant === GIST_UPDATE_ACTIONS.FORK && <BarsArrowUpIcon  className="cursor-pointer" height={20} width={20} />}
    </>
  )
}

export default StarFork