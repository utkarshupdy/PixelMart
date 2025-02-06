"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, PlusCircle, Image } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      <Link href="/"></Link>
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
          >
            <Home className="w-5 h-5" />
            Pixel Mart
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-center gap-3">
            {/* Home Button */}
            <Link href="/" className="btn btn-outline btn-sm">
              <Home className="w-4 h-4" />
              Home
            </Link>

            {/* Gallery Button (Collection Section) */}
            <Link href="/collection" className="btn btn-secondary btn-sm">
              <Image className="w-4 h-4" />
              Gallery
            </Link>

            {/* Add Product Button (Visible for Admins) */}
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  showNotification("Welcome to Product Dashboard", "info")
                }
              >
                <PlusCircle className="w-4 h-4" />
                Add Product
              </Link>
            )}

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <User className="w-5 h-5" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2">
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <Link href="/orders" className="px-4 py-2 hover:bg-base-200 block w-full">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/user-products" className="px-4 py-2 hover:bg-base-200 block w-full">
                        My Products
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleSignOut} className="px-4 py-2 text-error hover:bg-base-200 w-full text-left">
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/login" className="px-4 py-2 text-white  hover:text-green-400 block w-full">
                      Login
                    </Link>
                    <Link href="/register" className="px-4 py-2 text-white  hover:text-green-400 block w-full">
                      SignUp
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
