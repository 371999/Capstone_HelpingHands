"use client";

import { useContext, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getProfileData } from "../../../Auth/AuthService";
import { AuthContext } from "../../../Auth/AuthContext";
import { useRouter } from "next/navigation";
import { ADMIN_LINKS, INITIAL_LINKS } from "@/lib/constants";

interface DecodedToken {
  firstName?: string;
  lastName?: string;
  gymName?: string;
  type?: string;
  id?: string;
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const context = useContext(AuthContext);
  const [profileData, setProfileData] = useState<DecodedToken | null>(null);
  const userProfile = getProfileData();
  const { signout } = context;
  const router = useRouter();

  useEffect(() => {
    if (userProfile) {
      try {
        // @ts-ignore
        setProfileData(userProfile);
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader className="my-4">
          <SheetTitle className="text-left">Go To</SheetTitle>
        </SheetHeader>
        <div className={cn("flex flex-col w-full my-4")}>
        {profileData?.type == "user" && (
            // <nav className="hidden md:flex items-center text-sm font-medium">
            <>
              {INITIAL_LINKS.map((link, index) => {
                return (
                  <Link key={index} href={link.ref} prefetch={false}>
                    <Button variant="ghost" className="w-full">
                      {link.name}
                    </Button>
                  </Link>
                );
              })}
            </>
          )}
          {profileData?.type == "admin" && (
            // <nav className="hidden md:flex items-center text-sm font-medium">
            <>
              {ADMIN_LINKS.map((link, index) => {
                return (
                  <Link key={index} href={link.ref} prefetch={false}>
                    <Button variant="ghost" className="w-full">
                      {link.name}
                    </Button>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
