import type { Metadata } from "next";
import { Suspense } from "react";
import LoginPage from "./login-page";

export const metadata: Metadata = {
    title: "Log In",
};

export default function Page() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}
