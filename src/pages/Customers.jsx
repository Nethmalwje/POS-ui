import TableView from "../components/Table";
function Customers() {
  return (
    <div className="mx-4 mt-4">
      <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
        All Customers
      </h1>
      <div className="mt-4">
        <TableView />
      </div>
    </div>
  );
}

export default Customers;
