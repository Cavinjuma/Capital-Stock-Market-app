
import MainLayout from "../layouts/MainLayout"
import CounterForm from "../components/CounterForm"
import CountersTable from "../components/CountersTable"

function Counters() {
  return (
    <MainLayout>
      <CounterForm />

      <CountersTable />
    </MainLayout>
  )
}

export default Counters