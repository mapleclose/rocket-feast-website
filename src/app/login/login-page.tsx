"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Form } from "@/components/base/form/form";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Google, Apple, Facebook } from "@/components/foundations/social-icons";
import { CheckCircle, Copy01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

type Step = "credentials" | "otp" | "success";

const getOtpSetupKey = (otpAuthUrl: string): string => {
    if (!otpAuthUrl) return "";
    try {
        return new URL(otpAuthUrl).searchParams.get("secret") || "";
    } catch {
        return "";
    }
};

const LoginPage = () => {
    const searchParams = useSearchParams();
    const state = searchParams.get("state") || "";
    const mcpUrl = searchParams.get("mcp_url") || "";

    const [step, setStep] = useState<Step>("credentials");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [step1Token, setStep1Token] = useState("");
    const [otpAuthUrl, setOtpAuthUrl] = useState("");
    const [copiedSetupKey, setCopiedSetupKey] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpSetupKey = getOtpSetupKey(otpAuthUrl);

    const handleCredentialsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setOtpAuthUrl("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/auth/mcp-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, state, mcp_url: mcpUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Authentication failed");
                setLoading(false);
                return;
            }

            if (data.needs_otp) {
                setStep1Token(data.step1_token);
                setOtpAuthUrl(data.otpAuthUrl || data.otp_auth_url || "");
                setStep("otp");
                setLoading(false);
                // Focus first OTP input after render
                setTimeout(() => document.querySelector<HTMLInputElement>("[data-otp-idx='0']")?.focus(), 100);
                return;
            }

            if (data.redirect) {
                setStep("success");
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1000);
            }
        } catch {
            setError("Connection error. Please try again.");
            setLoading(false);
        }
    };

    const handleCopySetupKey = async () => {
        const value = otpSetupKey || otpAuthUrl;
        if (!value) return;
        await navigator.clipboard.writeText(value);
        setCopiedSetupKey(true);
        window.setTimeout(() => setCopiedSetupKey(false), 1200);
    };

    const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const otpValue = otp.join("");

        try {
            const res = await fetch("/api/auth/mcp-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: otpValue, step1_token: step1Token, state, mcp_url: mcpUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Verification failed");
                setLoading(false);
                return;
            }

            if (data.redirect) {
                setStep("success");
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1000);
            }
        } catch {
            setError("Connection error. Please try again.");
            setLoading(false);
        }
    };

    const handleOtpChange = (idx: number, value: string) => {
        const digit = value.replace(/[^0-9]/g, "").slice(-1);
        const next = [...otp];
        next[idx] = digit;
        setOtp(next);

        if (digit && idx < 5) {
            document.querySelector<HTMLInputElement>(`[data-otp-idx='${idx + 1}']`)?.focus();
        }
    };

    const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            document.querySelector<HTMLInputElement>(`[data-otp-idx='${idx - 1}']`)?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
        const next = [...otp];
        for (let i = 0; i < 6 && i < paste.length; i++) {
            next[i] = paste[i];
        }
        setOtp(next);
        const focusIdx = Math.min(paste.length, 5);
        document.querySelector<HTMLInputElement>(`[data-otp-idx='${focusIdx}']`)?.focus();
    };

    return (
        <div className="flex min-h-dvh flex-col items-center bg-primary pb-12 pt-24">
            <div className="flex w-full max-w-[360px] flex-col items-center gap-8 px-8">
                {/* Header */}
                <div className="flex w-full flex-col items-center gap-16">
                    <UntitledLogo />

                    <div className="flex w-full flex-col gap-3 text-center">
                        <h1 className="font-display text-display-sm font-semibold text-primary">
                            {step === "otp" ? "Enter verification code" : step === "success" ? "You\u2019re all set" : "Log in to your account"}
                        </h1>
                        <p className="text-md text-tertiary">
                            {step === "otp"
                                ? otpAuthUrl
                                    ? "Add this account to your authenticator, then enter the 6-digit code."
                                    : "Open your authenticator app and enter the 6-digit code."
                                : step === "success"
                                  ? "Authentication successful. Redirecting\u2026"
                                  : "Welcome back! Please enter your details."}
                        </p>
                    </div>
                </div>

                {/* Success state */}
                {step === "success" && (
                    <div className="flex justify-center">
                        <FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="w-full rounded-lg border border-error_subtle bg-error-primary p-3 text-sm text-error-primary">{error}</div>
                )}

                {/* Credentials form */}
                {step === "credentials" && (
                    <div className="flex w-full flex-col gap-6">
                        <Form onSubmit={handleCredentialsSubmit} className="flex w-full flex-col gap-6">
                            {/* Combined input card — matches Figma "Simple minimal" variant */}
                            <div className="w-full overflow-hidden rounded-[9px] border border-primary shadow-xs [&_[data-rac]]:!rounded-none [&_[data-rac]]:!shadow-none [&_[data-rac]]:!ring-0">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    isRequired
                                    autoComplete="email"
                                    size="md"
                                />
                                <div className="border-t border-primary" />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    isRequired
                                    autoComplete="current-password"
                                    size="md"
                                />
                            </div>

                            <Button type="submit" size="md" color="primary" isLoading={loading} showTextWhileLoading className="w-full">
                                Sign in
                            </Button>
                        </Form>

                        {/* Social logins */}
                        <div className="flex w-full flex-col gap-4">
                            <Button size="md" color="secondary" isDisabled iconLeading={Google} className="w-full">
                                Sign in with Google
                            </Button>
                            <Button size="md" color="secondary" isDisabled iconLeading={Apple} className="w-full">
                                Sign in with Apple
                            </Button>
                            <Button size="md" color="secondary" isDisabled iconLeading={Facebook} className="w-full">
                                Sign in with Facebook
                            </Button>
                        </div>
                    </div>
                )}

                {/* OTP form */}
                {step === "otp" && (
                    <Form onSubmit={handleOtpSubmit} className="flex w-full flex-col gap-6">
                        {otpAuthUrl && (
                            <div className="flex w-full flex-col gap-3 rounded-lg border border-primary bg-primary p-4 shadow-xs">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold text-primary">Authenticator setup key</p>
                                    <p className="text-sm text-tertiary">Use this key if your app cannot open the setup link.</p>
                                </div>
                                <div className="flex min-w-0 items-center gap-2">
                                    <code className="min-w-0 flex-1 break-all rounded-md bg-secondary px-2.5 py-2 font-mono text-xs text-primary">
                                        {otpSetupKey || otpAuthUrl}
                                    </code>
                                    <Button type="button" size="sm" color="secondary" iconLeading={Copy01} onClick={handleCopySetupKey}>
                                        {copiedSetupKey ? "Copied" : "Copy"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center gap-2">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    data-otp-idx={idx}
                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                    onPaste={idx === 0 ? handleOtpPaste : undefined}
                                    className="size-12 rounded-lg border border-primary bg-primary text-center font-display text-display-xs font-semibold text-primary shadow-xs outline-none transition duration-100 focus:border-brand focus:ring-2 focus:ring-brand"
                                />
                            ))}
                        </div>

                        <Button type="submit" size="md" color="primary" isLoading={loading} showTextWhileLoading className="w-full">
                            Verify Code
                        </Button>
                    </Form>
                )}

                {/* Footer links */}
                {step === "credentials" && (
                    <div className="flex w-full flex-col items-center gap-3">
                        <div className="flex items-baseline gap-1 text-sm">
                            <span className="text-tertiary">Don&apos;t have an account?</span>
                            <Button color="link-color" size="sm" href="#">
                                Sign up
                            </Button>
                        </div>
                        <Button color="link-color" size="sm" href="#">
                            Forgot password
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
