export default function AppIconBar({Link, PawIcon}) {
    return (
        <div>
            <Link
                to="/appointments"
                className="flex items-center gap-3 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-blue-800 font-semibold transition shadow-md"
            >
                <PawIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                <PawIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                <PawIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="text-xl sm:text-2xl font-bold">Appointments</span>
            </Link>
        </div>
    )
}