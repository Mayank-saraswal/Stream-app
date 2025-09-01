import { Logo } from "./_components/logo";


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10">

            </div>

            <div className="absolute top-6 left-6 z-10">
                <Logo />
            </div>

            <div className="flex items-center justify-center min-h-screen">
                {children}
            </div>
        </div>
    );

};
export default AuthLayout;