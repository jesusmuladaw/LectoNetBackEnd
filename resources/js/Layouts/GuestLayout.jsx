import { Link } from '@inertiajs/react';
import logoSVG from '../../img/LogoLectoNet.png';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-blue-50">
            <div>
                <Link href="/">
                    <img className='h-40' src={logoSVG} alt="Logo" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-blue-00 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
