export function Header() {
    return (
        <div className="w-full h-16 bg-blue-600 flex items-center justify-between px-6">
            <h1 className="text-white text-2xl font-bold"><span className="text-gray-500">Doc</span>Medi<span className="text-gray-500">Care</span></h1>
            <nav>
                <ul className="flex space-x-4 ">
                    <li><a href="/AdminHome" className="text-white hover:bg-blue-800 rounded-md p-2">Home</a></li>
                    <li><a href="/Profile" className="text-white hover:bg-blue-800 rounded-md p-2">Service</a></li>
                    <li><a href="/EditHospital" className="text-white hover:bg-blue-800 rounded-md p-2">Logout</a></li>
                </ul>
            </nav>
        </div>
    );
}