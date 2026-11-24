import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-emerald-500/10 p-5 text-emerald-400 mb-4 border border-emerald-500/20">
        <Trophy className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-black text-white">404</h1>
      <h2 className="text-xl font-bold text-gray-200 mt-2">Court Not Found</h2>
      <p className="mt-2 text-sm text-gray-400 max-w-md">
        The tournament, match or player page you are searching for does not exist or has been moved.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="primary">Return to Home Court</Button>
        </Link>
      </div>
    </div>
  );
}
