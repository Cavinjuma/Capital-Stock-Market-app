import MainLayout from "../layouts/MainLayout"
import SalesForm from "../components/SalesForm"
import SalesTable from "../components/SalesTable"

function Sales() {
  return (
    <MainLayout>
      <SalesForm />

      <SalesTable />
    </MainLayout>
  )
}

export default Sales