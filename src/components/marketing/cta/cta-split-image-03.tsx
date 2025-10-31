import { Button } from "@/components/base/buttons/button";

export const CTASplitImage03 = () => {
    return (
        <section className="bg-primary">
            <div className="bg-secondary pt-16 pb-[112px] md:pt-24 md:pb-40">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                        <p className="text-sm font-semibold text-brand-secondary md:text-md">Get started</p>
                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                            <span className="max-md:hidden">Start your 30-day free trial</span>
                            <span className="md:hidden">Start your free trial</span>
                        </h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Untitled.</p>
                        <div className="mt-8 flex w-full flex-col-reverse gap-3 md:w-auto md:flex-row">
                            <Button color="secondary" size="xl">
                                Learn more
                            </Button>
                            <Button size="xl"> Get started</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-16 max-w-container px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
                <img alt="Conversation" src="https://www.untitledui.com/marketing/conversation.webp" className="h-70 w-full object-cover md:h-129" />
            </div>
        </section>
    );
};
