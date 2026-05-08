import { useLoaderData } from 'react-router-dom'
import EventsList from '../components/EventsList';

function EventsPage() {

    // per accedere ai dati poi si utilizza useLoaderData che si occuperà di recuperare i dati necessari passati dalla fetch in app.
    const events = useLoaderData();

  return (
    <>

       <EventsList events={events}  />
    </>
  );
}

export default EventsPage;