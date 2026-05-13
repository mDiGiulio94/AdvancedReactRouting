import { useNavigate, Form, useNavigation, useActionData, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  // da accesso ai dati contenuti nell'azione
  const data = useActionData()
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // di default senza aggiungere action, questo form eseguirà l'azione collegata a questo path, dichiarata in App.js, se però aggiungiamo il decoratore action, la possiamo collegare ad un'altra che si trova su un qualsiasi altro path, ma se non vogliamo, action non serve
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
       {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event?.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event?.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event?.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required  defaultValue={event ? event?.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;


// submit a form using actions di react-router-dom
export async function manipulateEventAction({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = `http://localhost:8080/events`

  if(method === 'PATCH'){
    const eventId = params.id;
    url = `http://localhost:8080/events/${eventId}`
  }

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  } else if (!response.ok) {
    throw Response.json(
      { message: "Could not fetch events." },
      { status: 500 },
    );
  }

  //redirect da una response e fa il redirect alla pagina con l'url scelto
  return redirect("/events");
}
