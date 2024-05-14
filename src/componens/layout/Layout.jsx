import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
export const Layout = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleFocus = (index) => {
    setFocusedItem(index);
  };

  const handleBlur = () => {
    setFocusedItem(null);
  };
  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="nav__container">
            <a className="nav__container-link"></a>
          </div>
          <ul className="nav__list">
            <li
              key={3}
              className={
                hoveredItem === 3 || focusedItem === 3
                  ? 'customers_accent'
                  : 'customers'
              }
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}>
              <Link to="/" className="nav__link">
                Events
              </Link>
            </li>
            <li
              key={4}
              className={
                hoveredItem === 4 || focusedItem === 4
                  ? 'income_accent'
                  : 'income'
              }
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}>
              <Link to="/income" className="nav__link">
                Income
              </Link>
            </li>
            <li
              key={5}
              className={
                hoveredItem === 5 || focusedItem === 5
                  ? 'promote_accent'
                  : 'promote'
              }
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(5)}
              onBlur={handleBlur}>
              <Link to="/promote" className="nav__link">
                Promote
              </Link>
            </li>
            <li
              key={6}
              className={
                hoveredItem === 6 || focusedItem === 6 ? 'help_accent' : 'help'
              }
              onMouseEnter={() => handleMouseEnter(6)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(6)}
              onBlur={handleBlur}>
              <Link to="/help" className="nav__link">
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
