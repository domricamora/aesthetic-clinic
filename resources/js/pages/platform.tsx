import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { MAKER } from '@/layouts/site-layout';
import { useReveal } from '@/lib/site';
import { home, login } from '@/routes';

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

/** What the platform does, grouped by who uses it. Every line is a working screen in this demo. */
const GROUPS: { title: string; who: string; items: [string, string][] }[] = [
    {
        title: 'Front of house',
        who: 'Reception and practitioners',
        items: [
            ['Online booking', 'Live slots by treatment, branch and doctor, with guest checkout.'],
            ['Day agenda', 'Every chair at a glance, check-in, move and status in one click.'],
            ['Leads and CRM', 'Every enquiry with its source, a nine-stage pipeline and a timeline.'],
            ['Live chat', 'Website chat answered from the desk inbox, in real time.'],
        ],
    },
    {
        title: 'Back office',
        who: 'Cashiers, stock and branch managers',
        items: [
            ['Point of sale', 'Treatments and retail on one ticket, deposits, refunds and receipts.'],
            ['Inventory', 'Lots and expiry dates, first-expiry-first-out, transfers between branches.'],
            ['Accounting', 'A double-entry ledger fed by the till, with reports by period.'],
            ['HR and payroll', 'Staff records, attendance, leave and payslips with statutory deductions.'],
        ],
    },
    {
        title: 'The owner',
        who: 'Directors and clinic owners',
        items: [
            ['KPI dashboard', 'Revenue, gross profit, utilisation, retention and conversion, by period.'],
            ['Every branch, one login', 'Branch filters and per-branch figures across the group.'],
            ['Roles and permissions', 'Each role sees only what its job needs, enforced on the server.'],
            ['Audit trail', 'Who changed what and when, for refunds, stock and payroll.'],
        ],
    },
];

const SHOTS: [string, string][] = [
    ['platform-agenda.jpg', 'The day agenda with appointments by practitioner'],
    ['platform-pos.jpg', 'The point of sale register with a treatment ticket'],
    ['platform-inventory.jpg', 'Inventory with expiry alerts and stock value'],
    ['platform-leads.jpg', 'The leads pipeline with sources and stages'],
];

const LOGINS: [string, string, string][] = [
    ['Owner', 'owner@aesthetic-clinic.test', 'Dashboard, money, stock and people'],
    ['Reception', 'reception@aesthetic-clinic.test', 'Agenda, leads, chat and the till'],
    ['Super admin', 'admin@aesthetic-clinic.test', 'Everything, including settings'],
];

export default function Platform() {
    const { mediaUrl } = usePage().props;
    const media = (file: string) => `${mediaUrl}/${file}`;
    useReveal();

    return (
        <>
            <Head title="The Aesthetic Clinic SaaS Platform">
                <meta
                    name="description"
                    content="One operating system for aesthetic clinics: website and booking, CRM, chat, point of sale, inventory, accounting, HR and payroll. Designed and built by recursive-frog.com."
                />
            </Head>

            <section className="bg-blush">
                <div className="gutter grid items-center gap-14 pt-16 pb-20 lg:grid-cols-12 lg:pt-24 lg:pb-28">
                    <div className="hero-rise lg:col-span-5">
                        <h1 style={stagger(0)} className="text-5xl leading-[1.04] text-cocoa sm:text-6xl">
                            One system for the whole clinic.
                        </h1>
                        <p style={stagger(1)} className="mt-6 max-w-md text-lg leading-relaxed text-text">
                            The Aesthetic Clinic SaaS Platform runs the website, bookings, patients, till, stock, books and payroll. Designed and built end to end by the {MAKER.name} team.
                        </p>
                        <div style={stagger(2)} className="mt-9 flex flex-wrap gap-3">
                            <Link href={login().url} className="press btn btn-solid">
                                Explore the admin
                            </Link>
                            <a href={MAKER.url} target="_blank" rel="noopener" className="press btn btn-outline">
                                Talk to {MAKER.name} <ArrowUpRight className="size-4" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <img
                            src={media('platform-dashboard.jpg')}
                            alt="The owner dashboard with revenue, bookings and patient trends"
                            className="w-full rounded-xl border border-border bg-white shadow-lift"
                        />
                    </div>
                </div>
            </section>

            <section className="gutter py-20 lg:py-28">
                <h2 data-reveal className="max-w-2xl text-4xl leading-tight text-cocoa sm:text-5xl">
                    Built around the people who run a clinic.
                </h2>
                <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
                    {GROUPS.map((g, i) => (
                        <div key={g.title} data-reveal style={stagger(i)}>
                            <h3 className="font-display text-2xl text-cocoa">{g.title}</h3>
                            <p className="mt-1 text-[0.9375rem] text-muted-foreground">{g.who}</p>
                            <ul className="mt-6 space-y-5">
                                {g.items.map(([name, text]) => (
                                    <li key={name} className="flex gap-3">
                                        <Check className="mt-1 size-4 shrink-0 text-clay-deep" aria-hidden="true" />
                                        <span>
                                            <span className="block font-medium text-cocoa">{name}</span>
                                            <span className="text-[0.9375rem] text-text">{text}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-soft-rose py-20 lg:py-28">
                <div className="gutter">
                    <h2 data-reveal className="max-w-2xl text-4xl leading-tight text-cocoa sm:text-5xl">
                        The screens, as the clinic sees them.
                    </h2>
                    <ul className="mt-12 grid gap-6 md:grid-cols-2">
                        {SHOTS.map(([file, alt], i) => (
                            <li key={file} data-reveal style={stagger(i % 2)}>
                                <img src={media(file)} alt={alt} loading="lazy" className="w-full rounded-xl border border-border bg-white shadow-soft" />
                                <p className="mt-3 text-[0.9375rem] text-text">{alt}.</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="gutter grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
                <div className="lg:col-span-5">
                    <h2 data-reveal className="text-4xl leading-tight text-cocoa sm:text-5xl">
                        Sign in and look around.
                    </h2>
                    <p className="mt-5 max-w-md text-text">
                        The demo clinic holds a year of bookings, sales, stock and payroll. Every login uses the password <code className="rounded bg-soft-rose px-1.5 py-0.5 text-cocoa">password</code>.
                    </p>
                </div>
                <ul className="divide-y divide-border rounded-xl border border-border bg-white lg:col-span-7">
                    {LOGINS.map(([role, email, sees]) => (
                        <li key={email} className="flex flex-wrap items-center justify-between gap-4 p-6">
                            <span>
                                <span className="block font-display text-xl text-cocoa">{role}</span>
                                <span className="text-[0.9375rem] text-text">{sees}</span>
                            </span>
                            <span className="flex items-center gap-4">
                                <code className="text-[0.875rem] text-clay-ink">{email}</code>
                                <Link href={login({ query: { email } }).url} className="press btn btn-outline px-4 py-2">
                                    Sign in
                                </Link>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="on-dark bg-cocoa-deep text-white">
                <div className="gutter flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl">Want this for your clinic?</h2>
                        <p className="mt-3 max-w-xl text-blush">
                            The platform, its design and every line of its code come from the {MAKER.name} team. We set it up under your brand, with your branches, treatments and staff.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a href={MAKER.url} target="_blank" rel="noopener" className="press btn btn-solid">
                            Visit {MAKER.name}
                        </a>
                        <Link href={home().url} className="press btn btn-outline">
                            Back to the clinic site
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
