import { useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // per accedere ai dati poi si utilizza useLoaderData che si occuperà di recuperare i dati necessari passati dalla fetch in app.
  // const data = useLoaderData();
  // const events = data.events;
  //   questo hook può essere usato qui e in tutte le pagine e componenti che si trovano ad un livello inferiore da dove è dichiarato, ma non a pagine a livello superiore, ad esempio il fetching avviene in eventLayout, perciò questi dati non possono essere usati in componenti fuori da esso

  const { events } = useLoaderData();

  return (
    <>
   {/* Suspense mostra un fallback mentre Await risolve la Promise del loader. */}
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>

    </Suspense>

    </>
  );
}

export default EventsPage;

// questa funzione può essere dichiarata sia in app.js, sia nel componente di appartenenza, exportata, ed utilizzata in app, questo per avere un componente più pulito.
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    // so può usare anche il metodo json() di react router dom
    throw Response.json(
      { message: "Could not fetch events." },
      { status: 500 }
    );
  } else {
    // const resData = await response.json();
    // in caso di risposta valida react router prenderà i dati della response e li renderà disponibili nella pagina e in tutti i componenti dove sono necessari
    // return resData.events;
    // return response;
    // adesso vanno manualmente parsati
    const resData = await response.json();
    return resData.events;
  }
}

export function loader () {
  return {
    events: loadEvents()
  }
}

// Versione per React Router DOM con supporto a defer.
// In quelle versioni aggiungi anche defer all'import:
// import { useLoaderData, defer, Await } from "react-router-dom";
//
// export function loader() {
//   return defer({
//     events: loadEvents(),
//   });
// }
