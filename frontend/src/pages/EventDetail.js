import { useParams } from "react-router-dom";

export default function EventDetail() {
  const params = useParams();

  return (
    <>
      <h1>Event Detail</h1>
      <p>Event Id: {params.id}</p>
    </>
  );
}
