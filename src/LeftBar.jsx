import { NavLink } from 'react-router-dom';

export function LeftBar() {
  return (
    <div className="left-container">
      <NavLink to="/" className="menulist">
        <span>Word APP</span>
        <i className="fa-solid fa-house"></i>
      </NavLink>
      {/* <NavLink to="/searchword" className="menulist">
        <span>Search Word</span>
        <i className="fa-solid fa-magnifying-glass"></i>
      </NavLink> */}
      <NavLink to="/randomword" className="menulist">
        <span>Random Word</span>
        <i className="fa-solid fa-shuffle"></i>
      </NavLink>
    </div>
  );
}
