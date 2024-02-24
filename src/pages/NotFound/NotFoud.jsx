import { NavLink } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <p>Ops, page is not found, please <NavLink to='/'>go back</NavLink></p>
        </div>
    )
}