import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
    return (
        <div className="flex  flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image
                    className="rounded-full"
                    src="/logo.svg"
                    alt="logo"
                    width={60}
                    height={60}
                />
            </div>
            <div className= { cn("flex flex-col items-center" , font.className) } >
                <p className="text-xl font-semibold">
                    Mstream

                </p>
                <p className="text-sm text-muted-foreground">
                    Lets Play

                </p>
            </div>
        </div>
    );
};