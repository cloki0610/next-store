"use client";
import Link from "next/link";
export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center h-80">
            <h2 className="text-4xl font-semibold mb-10">Payment complete.</h2>
            <p className="text-xl text-center">
                Thanks for your purchase and see you again.
            </p>
            <Link href={"/"} className="p-3 mt-6 rounded bg-primary">
                <p className="text-white hover:text-amber-300">Back to home</p>
            </Link>
        </div>
    );
}
