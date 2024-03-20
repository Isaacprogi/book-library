import { NavLink } from "react-router-dom"
import { NavLinks } from "../../../types/types"

const NavItem = ({path,value}:NavLinks) => {
  return (
    <NavLink to={`${path}`}
          className={({ isActive, isPending }) =>
            isPending ? "pending relative" : isActive ? "text-green-500 relative hover:text-neutral-400 transition-all duration-300  " : " relative transition-all hover:text-neutral-400 duration-300 text-neutral-200"
          }
        >
         {value}
    </NavLink>
  )
}

export default NavItem