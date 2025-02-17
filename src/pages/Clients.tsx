
import ListDisplay from "../components/ListDisplay"

type Props = {}

const Clients = (props: Props) => {
  return (
    <ListDisplay items={[{id: 1, name: "Client 1", email: "email1"}, {id: 2, name: "Client 2", email: "email2"}]} proprieties={[ "email"]}/>
  )
}

export default Clients