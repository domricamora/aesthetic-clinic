import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { ChatWidget } from '@/components/site/chat-widget';
import { SOCIAL_LABELS, SocialIcon } from '@/components/site/social-icon';
import Wordmark from '@/components/site/wordmark';
import { cn } from '@/lib/utils';
import {
    about,
    beforeAfter,
    book,
    contact,
    home,
    legal,
    login,
    membership,
    platform,
    promotions,
    sitemap,
} from '@/routes';
import blog from '@/routes/blog';
import leads from '@/routes/leads';
import treatments from '@/routes/treatments';

const nav = [
    { label: 'Treatments', href: treatments.index().url },
    { label: 'About', href: about().url },
    { label: 'Membership', href: membership().url },
    { label: 'Offers', href: promotions().url },
    { label: 'Journal', href: blog.index().url },
    { label: 'Contact', href: contact().url },
];

/** The platform maker, credited on every public page. */
export const MAKER = { name: 'recursive-frog.com', url: 'https://recursive-frog.com' };

export default function SiteLayout({ children }: { children: ReactNode }) {
    const { flash } = usePage<{ flash?: { success?: string | null } }>().props;
    const [open, setOpen] = useState(false);
    const path = usePage().url.split('?')[0];

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    return (
        <div className="site theme-light min-h-dvh bg-background text-foreground">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
            >
                Skip to content
            </a>

            {/*
                The showcase strip. This site is the live demo of the platform,
                so the first line on every page says so and offers the way in.
                It scrolls away with the page; the header stays.
            */}
            <div className={cn('on-dark bg-cocoa-deep text-[0.8125rem] text-blush', open && 'hidden')}>
                <div className="gutter flex min-h-10 flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-center sm:justify-between">
                    <p>
                        A live demo of the Aesthetic Clinic SaaS Platform, built by{' '}
                        <a
                            href={MAKER.url}
                            target="_blank"
                            rel="noopener"
                            className="font-medium text-champagne underline-offset-4 hover:underline"
                        >
                            {MAKER.name}
                        </a>
                    </p>
                    <div className="hidden items-center gap-5 sm:flex">
                        <Link href={platform().url} className="hover:text-white">
                            See the platform
                        </Link>
                        <Link href={login().url} className="inline-flex items-center gap-1 font-medium text-white hover:text-champagne">
                            Explore the admin <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
                <div className="gutter flex h-[4.5rem] items-center justify-between gap-6">
                    <Link href={home().url} className="press min-w-0" aria-label="Home">
                        <Wordmark />
                    </Link>

                    <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
                        {nav.map((item) => {
                            const active = path.startsWith(item.href.replace(/^https?:\/\/[^/]+/, ''));

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'relative rounded-md px-3.5 py-2 text-[0.9375rem] text-foreground/75 transition-colors duration-150 hover:text-cocoa',
                                        'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-clay after:transition-transform after:duration-200 after:ease-out',
                                        active ? 'text-cocoa after:scale-x-100' : 'hover:after:scale-x-100',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link href={login().url} className="hidden rounded-md px-3 py-2 text-[0.9375rem] text-foreground/75 hover:text-cocoa sm:inline">
                            Sign in
                        </Link>
                        <Link href={book().url} className="press btn btn-solid hidden sm:inline-flex">
                            Book now
                        </Link>
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="press -mr-2 rounded-md p-2 xl:hidden"
                            aria-expanded={open}
                            aria-controls="mobile-nav"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                        >
                            {open ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* A sibling of the header, not a child: backdrop-filter would make
                the header the containing block for this fixed panel. */}
            <nav
                id="mobile-nav"
                aria-label="Mobile"
                className={cn(
                    'fixed inset-x-0 top-[4.5rem] bottom-0 z-30 overflow-y-auto bg-background px-4 pt-4 pb-28 sm:px-8 xl:hidden',
                    open ? 'block' : 'hidden',
                )}
            >
                <ul className="divide-y divide-border">
                    {[...nav, { label: 'Sign in', href: login().url }].map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex py-4 font-display text-[1.75rem] text-cocoa"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link href={book().url} onClick={() => setOpen(false)} className="press btn btn-solid mt-8 w-full">
                    Book now
                </Link>
            </nav>

            <main id="main">{children}</main>

            <SiteFooter />
            <ChatWidget />

            {/* The phone's one call to action, always within thumb reach. */}
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
                <Link href={book().url} className="press btn btn-solid w-full">
                    Book now
                </Link>
            </div>

            {flash?.success && (
                <div
                    role="status"
                    className="fixed right-4 bottom-20 z-50 max-w-sm rounded-lg bg-cocoa px-5 py-4 text-sm text-white shadow-lift sm:bottom-6"
                >
                    {flash.success}
                </div>
            )}
        </div>
    );
}

function SiteFooter() {
    const { clinic, socials } = usePage().props;
    const form = useForm({ form: 'newsletter', email: '', privacy_consent: false });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post(leads.store().url, {
            preserveScroll: true,
            onSuccess: () => form.reset('email'),
        });
    };

    const columns: [string, [string, string][]][] = [
        [
            'Explore',
            [
                ['Treatments', treatments.index().url],
                ['About us', about().url],
                ['Membership', membership().url],
                ['Offers', promotions().url],
                ['Before and after', beforeAfter().url],
                ['Journal', blog.index().url],
            ],
        ],
        [
            'Visit',
            [
                ['Makati', contact().url],
                ['BGC, Taguig', contact().url],
                ['Cebu Business Park', contact().url],
                ['Book a consultation', book().url],
            ],
        ],
    ];

    return (
        <footer className="border-t border-border bg-soft-rose pb-24 sm:pb-0">
            <div className="gutter grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
                <div className="lg:col-span-4">
                    <Wordmark markClassName="size-11" nameClassName="text-[1.9rem]" />
                    <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-text">
                        {clinic.tagline} Physician-led aesthetic and wellness care in Makati, BGC and Cebu.
                    </p>
                    <p className="mt-6 space-y-1 text-[0.9375rem]">
                        <a href={`tel:${clinic.contact.phone.replace(/\s/g, '')}`} className="block text-cocoa hover:text-clay-ink">
                            {clinic.contact.phone}
                        </a>
                        <a href={`mailto:${clinic.contact.email}`} className="block text-cocoa hover:text-clay-ink">
                            {clinic.contact.email}
                        </a>
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 text-[0.9375rem] lg:col-span-4">
                    {columns.map(([title, links]) => (
                        <div key={title}>
                            <h2 className="font-display text-lg text-cocoa">{title}</h2>
                            <ul className="mt-4 space-y-2.5">
                                {links.map(([label, href]) => (
                                    <li key={label}>
                                        <Link href={href} className="text-text hover:text-clay-ink">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <form onSubmit={submit} className="lg:col-span-4">
                    <h2 className="font-display text-lg text-cocoa">Skin notes, once a month</h2>
                    <p className="mt-2 text-[0.9375rem] text-text">Seasonal care tips and member offers. Unsubscribe anytime.</p>
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <div className="mt-5 flex gap-2">
                        <input
                            id="newsletter-email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder="you@email.com"
                            className="h-12 min-w-0 flex-1 rounded-md border border-input bg-white px-4 text-[0.9375rem] placeholder:text-muted-foreground focus:border-clay focus:outline-none"
                        />
                        <button type="submit" disabled={form.processing} className="press btn btn-solid h-12 disabled:opacity-50">
                            Subscribe
                        </button>
                    </div>
                    <label className="mt-3 flex items-start gap-2 text-[0.8125rem] text-text">
                        <input
                            type="checkbox"
                            required
                            checked={form.data.privacy_consent}
                            onChange={(e) => form.setData('privacy_consent', e.target.checked)}
                            className="mt-0.5"
                        />
                        <span>I agree to the privacy notice and to receive email from {clinic.short_name}.</span>
                    </label>
                    {(form.errors.email || form.errors.privacy_consent) && (
                        <p role="alert" className="mt-2 text-[0.8125rem] text-clay-ink">
                            {form.errors.email ?? form.errors.privacy_consent}
                        </p>
                    )}
                </form>
            </div>

            <div className="gutter flex flex-col gap-4 border-t border-border py-6 text-[0.8125rem] text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
                <p>
                    © {new Date().getFullYear()} {clinic.name}. A demonstration clinic; names and people are fictional.
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {[
                        ['Privacy policy', legal('privacy-policy').url],
                        ['Terms', legal('terms').url],
                        ['Data privacy notice', legal('data-privacy-notice').url],
                        ['Sitemap', sitemap().url],
                    ].map(([label, href]) => (
                        <li key={label}>
                            <a href={href} className="hover:text-clay-ink">
                                {label}
                            </a>
                        </li>
                    ))}
                    {socials &&
                        Object.entries(socials).map(([key, href]) => (
                            <li key={key}>
                                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-clay-ink">
                                    <SocialIcon platform={key} className="size-4" />
                                    {SOCIAL_LABELS[key] ?? key}
                                </a>
                            </li>
                        ))}
                </ul>
                <p>
                    Platform by{' '}
                    <a href={MAKER.url} target="_blank" rel="noopener" className="font-medium text-cocoa hover:text-clay-ink">
                        {MAKER.name}
                    </a>
                    . Photos via Unsplash and Pexels.
                </p>
            </div>
        </footer>
    );
}
