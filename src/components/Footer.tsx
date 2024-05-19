import Link from 'next/link';

import { ArrowUpRight, Github, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="z-10 absolute bottom-0 w-full flex justify-around text-center p-8">
      <Link
        href="https://github.com/eltatata"
        target="_blank"
        className="flex items-center gap-2 cursor-pointer hover:underline"
      >
        <User className="w-6 h-6" />
        Made by David
        <ArrowUpRight className="w-4 h-4" />
      </Link>
      <Link
        href="https://github.com/eltatata/TASKTRAKER"
        target="_blank"
        className="flex items-center gap-2 cursor-pointer hover:underline"
      >
        <Github className="w-6 h-6" />
        Star on GitHub
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </footer>
  )
}