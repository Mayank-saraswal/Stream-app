
import { Container } from "lucide-react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className=" h-full pt-20">
        <Sidebar/>
        
       <Container>
        {children}
       </Container>
        

      </div>
      
    </>
  );
}
