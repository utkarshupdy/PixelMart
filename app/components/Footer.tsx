"use client";

import Link from "next/link";
import { Home, Twitter, Instagram, Facebook } from "lucide-react";
import { useNotification } from "./Notification";

export default function Footer() {
  const { showNotification } = useNotification();

  return (
    <footer className="bg-base-300 text-base-content p-6 w-full mt-auto">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Branding */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors duration-300"
          >
            <Home className="w-5 h-5" />
            Pixel Mart
          </Link>
          <p className="text-sm opacity-75 mt-2">
            Pixel Mart – Your gateway to amazing art.
            <br />
            © {new Date().getFullYear()} Pixel Mart. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        

        {/* Contact Info */}
        <div>
          <span className="footer-title">Contact</span>
          <div className="mt-2 space-y-1">
            <a
              className="block link link-hover cursor-pointer hover:text-primary transition-colors duration-300"
              onClick={() =>
                showNotification("Email us at utkarshupdy@pixelmart.com", "info")
              }
            >
              utkarshupdy@pixelmart.com
            </a>
            <a
              className="block link link-hover cursor-pointer hover:text-primary transition-colors duration-300"
              onClick={() => showNotification("Call us: +91 730-XXX-6387", "info")}
            >
              +91 730-XXX-6387
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <span className="footer-title">Follow Us</span>
          <div className="flex gap-4 mt-2">
            {[
              { name: "Twitter", icon: Twitter },
              { name: "Instagram", icon: Instagram },
              { name: "Facebook", icon: Facebook },
            ].map((platform) => (
              <a
                key={platform.name}
                className="cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() =>
                  showNotification(`Follow us on ${platform.name}`, "info")
                }
              >
                <platform.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
