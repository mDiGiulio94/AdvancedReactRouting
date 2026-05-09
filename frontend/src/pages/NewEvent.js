import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEvent() {
  return <EventForm />;
}

// submit a form using actions di react-router-dom
export async function actionNewEvent({request, params}) {
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

 const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if(!response.ok){
       throw Response.json(
      { message: "Could not fetch events." },
      { status: 500 }
    );
  }

//redirect da una response e fa il redirect alla pagina con l'url scelto
  return redirect('/events');
}
