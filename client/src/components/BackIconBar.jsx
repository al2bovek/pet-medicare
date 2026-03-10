import PawIconBar from "./PawIconsBar"
export default function BackIconBar({user, Link, PawIcon }) {
    return (
        <div className="mx-auto mb-4">
            <Link
                to={user?.role === "admin" ? "/admin" : "/client"}
                className="flex items-center gap-3 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-amber-700 font-semibold transition shadow-md w-max"
            >
                <PawIconBar 
                PawIcon={PawIcon}
                />
            </Link>
        </div>
    )
}