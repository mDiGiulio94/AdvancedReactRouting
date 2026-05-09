import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong.";

  if (error?.status === 500) {
    if (typeof error.data === "string") {
      try {
        message = JSON.parse(error.data).message;
      } catch {
        message = error.data || message;
      }
    } else {
      message = error.data?.message || message;
    }
  }

  if (error?.status === 404) {
    title = "Not found";
    message = "Could not find the requested page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
