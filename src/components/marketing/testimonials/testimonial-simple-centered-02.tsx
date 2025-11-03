import { Avatar } from "@/components/base/avatar/avatar";

export const TestimonialSimpleCentered02 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <figure className="flex w-full shrink-0 snap-start flex-col gap-8 text-center">
                    {/* Light mode image (hidden in dark mode) */}
                    <img
                        alt="Wildcrafted"
                        src="https://www.untitledui.com/logos/logotype/color/wildcrafted.svg"
                        className="h-10 dark:hidden"
                        aria-hidden="true"
                    />
                    {/* Dark mode image (hidden in light mode) */}
                    <img
                        alt="Wildcrafted"
                        src="https://www.untitledui.com/logos/logotype/white/wildcrafted.svg"
                        className="h-10 opacity-85 not-dark:hidden"
                        aria-hidden="true"
                    />

                    <blockquote className="text-display-sm font-medium text-primary md:text-display-lg">
                        We've been using Untitled to kick start every new project and can't imagine working without it.
                    </blockquote>
                    <figcaption className="flex justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <Avatar src="https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80" alt="Amelie Laurent" size="2xl" />
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-semibold text-primary">Amélie Laurent</p>
                                <cite className="text-md text-tertiary not-italic">Product Manager, Wildcrafted</cite>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};
