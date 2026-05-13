import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function NewsletterSignup() {
  // viene usato quando si vuole far partire un azione o un loader senza però navigare alla pagina dove l'azione o il loader si trovano
  const fetcher = useFetcher();
  // fetcher ha molte proprietà non solo la funzione sopra ad esempio si possono accedere a tuttii data con la proprietà data ad esempio
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert("Submitted");
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
