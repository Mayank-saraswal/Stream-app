"use client"

import { toast } from "sonner";
import { useEffect, useState } from "react";
import  { JwtPayload } from "jwt-decode";
import { createViewerToken } from "@/actions/token";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
}

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");

  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        console.log("Viewer Token:", viewerToken);


        setToken(viewerToken);

        const decodedToken = jwtDecode<CustomJwtPayload>(viewerToken);
        console.log("Decoded Token:", decodedToken);

        if (decodedToken.name) {
          setName(decodedToken.name);
        }

        if (decodedToken.sub) {
          setIdentity(decodedToken.sub);
        }
      } catch (error) {
        toast.error("Error creating token");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
