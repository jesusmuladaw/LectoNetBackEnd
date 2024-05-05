import { Link } from '@inertiajs/react';
import logoSVG from '../../img/LogoLectoNet.svg';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-500">
            <div>
                <Link href="/">
                    <img className='h-40' src={logoSVG} alt="Logo" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-700 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
