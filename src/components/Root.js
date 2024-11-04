import { Outlet, Link } from "react-router-dom";
export default function Root() {

  return (
    <>
      <div id="sidebar">
        <div className="sidebar-header"></div>
        <nav>
          <ul>
            <li>
              <Link to={`/menu`}>Menu 1</Link>
            </li>
            <li>
              <Link to={`/menu2`}>Menu 2</Link>
            </li>
            <li>
              <Link to={`/`}>Powrót</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}