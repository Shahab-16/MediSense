

const ListItems = () => {

  return (
    <div className="px-16 pt-4 w-full">
      <h1 className="text-3xl font-semibold mb-2">Available Food Stocks</h1>
      <hr className="border-t-2 border-gray-300 mb-4" />

      <div className="grid grid-cols-5 gap-5 font-semibold text-left">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Delete Food Items</b>
      </div>
      <hr className="border-t-2 border-gray-300 my-2" />
    </div>
  )
}

export default ListItems
