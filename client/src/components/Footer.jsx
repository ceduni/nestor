import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="footer h-max">
      <div className="flex flex-col gap-2 w-full max-w-screen-xl mx-auto md:py-8">
        <div className="flex justify-center">
          <a href="https://github.com/ceduni/nestor">
            <FaGithub className="size-6" />
          </a>
        </div>
        <div className="flex justify-center">
          <p className="font-medium">&copy; 2024 Nestor</p>
        </div>
      </div>
    </footer>
  );
}
