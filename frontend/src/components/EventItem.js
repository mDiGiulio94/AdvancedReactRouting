import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {

  const submit = useSubmit();

  const startDeleteHandler = () => {
   const proceed = window.confirm('Are you sure?');

   if(proceed){
    // con questo hook di react-router-dom, i dati recuperati verranno automaticamente wrappati come formData object, generalmente i dati potrebbero essere estratti utilizzando il get, come nella post, ma siccome in questo caso non ci sono dati da estrarre viene settato a null
      submit(null, { method: 'delete'}, )
   }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
