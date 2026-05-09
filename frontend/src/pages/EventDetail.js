import { useRouteLoaderData } from "react-router-dom";
import EventItem from '../components/EventItem';

export default function EventDetail() {
const data = useRouteLoaderData('event-detail');
  return (
    <>
     <EventItem event={data.event} />
    </>
  );
}


export async function eventDetailLoader({ request, params }) {

  const id = params.id;

  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw Response.json(
      { message: "Could not fetch event." },
      { status: 500 }
    );
  } else {
    return response;
  }

}
