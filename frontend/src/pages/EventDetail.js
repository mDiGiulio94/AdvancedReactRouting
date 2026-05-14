import { redirect, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList"
import { Suspense } from "react";

export default function EventDetail() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}> <Await resolve={event}>
      {(loadedEvent) => <EventItem event={loadedEvent} />}
    </Await></Suspense>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}> <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await></Suspense>
   
    

    </>
  );
}

export async function eventDetailLoader({ request, params }) {
  const id = params.id;
  return {
    event: await loadEvent(id),
    events: loadEvents(),
  }
}

// Versione per React Router DOM con supporto a defer.
// In quelle versioni aggiungi anche defer all'import:
// import { redirect, useRouteLoaderData, defer, Await } from "react-router-dom";
//
// export async function eventDetailLoader({ request, params }) {
//   const id = params.id;
//   return defer({
//     event: await loadEvent(id),
//     events: loadEvents(),
//   });
// }

export async function deleteEventAction({ request, params }) {
  const id = params.id;

  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw Response.json({ message: "Could not fetch event." }, { status: 500 });
  } else {
    return redirect('/events');
  }
}

async function loadEvent(id){
const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw Response.json({ message: "Could not fetch event." }, { status: 500 });
  } else {
     const resData = await response.json();
     return resData.event
    }
}

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
