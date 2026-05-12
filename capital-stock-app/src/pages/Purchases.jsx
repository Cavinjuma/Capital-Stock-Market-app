import MainLayout from "../layouts/MainLayout"
import PurchaseForm from "../components/PurchaseForm"
import PurchasesTable from "../components/PurchasesTable"

function Purchases() {
  return (
    <MainLayout>
      <PurchaseForm />

      <PurchasesTable />
    </MainLayout>
  )
}

export default Purchases