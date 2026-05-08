import { NavLink } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  const activeClass = ({ isActive }) => (isActive ? classes.active : undefined);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* end qui serve per definire che il collegamento venga trattato come attivo solo seil percorso attuale termina con /event in questo caso  */}
            <NavLink to="/events" className={activeClass} end>
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/events/new" className={activeClass}>
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
