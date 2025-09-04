import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Suspense } from "react";
import { SidebarSkeleton } from "@/app/(browse)/_components/sidebar"
export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className=" h-full pt-20">


        <Suspense fallback={<SidebarSkeleton />}>
          
        <Sidebar/>
        </Suspense>
        
       <Container>
        {children}
       </Container>
        

      </div>
      
    </>
  );
}
