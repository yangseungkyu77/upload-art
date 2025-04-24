import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-2xl mx-auto pt-6 px-4">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
