export function EditDoc() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Doctor</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">Doctor Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter doctor's name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter specialization"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditDoc;