import {Outlet, Link, useNavigate} from "react-router-dom";
import {removeToken} from "../api/AuthService.js";
import { CircleGauge } from "lucide-react";
import { BookOpenText } from "lucide-react";
import {ChartNoAxesCombined} from "lucide-react";
import {Settings} from 'lucide-react';


function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    const navLinks = [
        {to: "/dashboard", label: "Dashboard", icon: CircleGauge},
        {to: "/readings", label: "Readings", icon: BookOpenText},
        {to: "/stats", label: "Insights", icon: ChartNoAxesCombined},
        {to: "/settings", label: "Settings", icon: Settings},
    ]

    return (
        <div className="min-h-dvh ">


            <aside className="fixed top- left-0 w-42 h-screen p-4 flex flex-col justify-start shadow-md z-50 bg-primary ">
                <nav className="flex flex-col gap-8 mt-6 mr-2">
                    {navLinks.map(({ to, label, icon: Icon}) => (
                        <Link
                            key={to}
                            to={to}
                            className="ml-2 text-white flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                            <Icon className="text-elements size-5" />
                            <span className="text-textMain">{label}</span>
                        </Link>
                        ))}
                </nav>
            </aside>


            <main className="ml-[168px] h-screen overflow-y-auto p-8 scrollbar-none scrollbar-hide">
                <Outlet/>
            </main>

            {/*<footer style={{marginTop: 'auto', textAlign: 'center', padding: '2rem'}}>*/}
            {/*    <small>BPTracker © 2025</small>*/}
            {/*</footer>*/}
        </div>
    )
}

export default MainLayout;