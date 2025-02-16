import { useParams } from "react-router-dom";

type Props = {}

const ClientDetails = (props: Props) => {
  const { id } = useParams();
  if (!id) return <p>CLiente não existe!</p>;

  return (
    <div>ClientDetails id: {id}</div>
  )
}

export default ClientDetails