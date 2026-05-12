import MainLayout from "../layouts/MainLayout"
import PriceForm from "../components/PriceForm"
import PricesTable from "../components/PricesTable"

function Prices() {
  return (
    <MainLayout>
      <PriceForm />

      <PricesTable />
    </MainLayout>
  )
}

export default Prices