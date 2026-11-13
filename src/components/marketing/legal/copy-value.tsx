"use client";

import { Check, Copy01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useClipboard } from "@/hooks/use-clipboard";

/** A value people copy, such as the server address. The only interactive part of the legal pages. */
export const CopyValue = ({ label, value }: { label: string; value: string }) => {
    const { copied, copy } = useClipboard();

    return (
        <div className="not-prose my-6 flex flex-col gap-3 rounded-xl bg-secondary p-4 ring-1 ring-secondary ring-inset sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-col gap-1">
                <span className="text-sm font-medium text-secondary">{label}</span>
                <code className="font-mono text-md font-semibold [overflow-wrap:anywhere] text-primary">{value}</code>
            </div>
            <Button color="secondary" size="md" iconLeading={copied ? Check : Copy01} onClick={() => copy(value)} className="shrink-0">
                {copied ? "Copied" : "Copy"}
            </Button>
        </div>
    );
};
