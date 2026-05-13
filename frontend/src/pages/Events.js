import { useLoaderData, defer, Await } from "react-router-dom";
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
   {/* suspense viene utilizzato per visualizzare una schermata di fall back quando dei dati non sono ancrora caricati */}
    <Suspense >
       {/* con defer viene usato questo componente specifico di react-router-dom */}
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

// defer viene viene utilizzato in versioni passate di react-router-dom precedenti alla 7
export function loader () {
  // defer contiene un oggetto che tiene le request http, dopo di che si va al componente dove viene usato 
  return defer({
    events: loadEvents()
  })
}

// nelle versioni moderne il defer non viene più utilizzato, il loader può essere scrutti durettanebte come segue:

// export async function loader() {
//   return {
//     events: loadEvents(),
//   };
// }