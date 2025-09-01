import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
    return (
        <div className="flex items-center gap-x-4">
            <div className="flex-shrink-0">
                <Image
                    className="rounded-full"
                    src="/logo.svg"
                    alt="logo"
                    width={60}
                    height={60}
                />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className={cn("text-2xl font-bold text-primary", font.className)}>
                    Mstream
                </h1>
                <p className={cn("text-sm text-muted-foreground font-medium", font.className)}>
                    lets Play & Stream
                </p>
            </div>
        </div>
    );
};