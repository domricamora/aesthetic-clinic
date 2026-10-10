import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Check, Star } from 'lucide-react';
import type { CSSProperties, FormEvent } from 'react';
import AppointmentCard from '@/components/site/appointment-card';
import BeforeAfter from '@/components/site/before-after';
import HeroVideo from '@/components/site/hero-video';
import { formatDuration, formatPrice, useReveal } from '@/lib/site';
import { cn } from '@/lib/utils';
import { about, beforeAfter, book, login, platform } from '@/routes';
import leads from '@/routes/leads';
import treatmentRoutes from '@/routes/treatments';
import type { Branch, Category, Testimonial, Treatment } from '@/types/site';

type Props = {
    categories: Category[];
    featured: Treatment[];
    bookable: Treatment[];
    branches: Branch[];
    testimonials: Testimonial[];
};

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
const price = (t: Treatment) => formatPrice(t.promo_price ?? t.price);

export default function Home({ categories, featured, bookable, branches, testimonials }: Props) {
    const { clinic, mediaUrl } = usePage().props;
    const media = (file: string) => `${mediaUrl}/${file}`;
    useReveal();

    const signature = featured.slice(0, 3);
    // The grid starts after the three signature treatments, so nothing on the
    // page is shown twice in a row.
    const grid = [...featured.slice(3), ...bookable.filter((b) => !featured.some((f) => f.id === b.id))].slice(0, 6);

    return (
        <>
            <Head title="Physician-led aesthetic care in Makati, BGC and Cebu">
                <meta
                    name="description"
                    content={`${clinic.name}: facials, injectables, laser, body, hair and wellness care led by licensed physicians. Book a consultation online in under a minute.`}
                />
            </Head>

            {/*
                The hero, from the mockup: the treatment room fills the frame and
                the promise sits over its quiet side. A cocoa wash on the left
                carries the white type at AA whatever frame the film is on.
            */}
            <section className="on-dark relative isolate flex min-h-[min(88dvh,52rem)] items-end overflow-hidden bg-cocoa text-white lg:items-center">
                <HeroVideo className="[&_video]:object-[80%_center] [&_img]:object-[80%_center]" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_30_28/0.9),rgb(42_30_28/0.72)_55%,rgb(42_30_28/0.45))] lg:bg-[linear-gradient(to_right,rgb(42_30_28/0.84),rgb(42_30_28/0.66)_45%,rgb(42_30_28/0.18)_68%,rgb(42_30_28/0)_82%)]"
                />
                <div className="gutter w-full pt-24 pb-28 lg:pb-32">
                    <div className="hero-rise max-w-[46rem]">
                        <h1 style={stagger(0)} className="max-w-[16ch] text-[2.75rem] leading-[1.04] sm:text-6xl lg:max-w-none lg:text-[4.25rem]">
                            Natural results, planned by your doctor.
                        </h1>
                        <p style={stagger(1)} className="mt-6 max-w-[30rem] text-lg leading-relaxed text-white/85">
                            Facials, injectables, laser and body care in Makati, BGC and Cebu. Book online in under a minute.
                        </p>
                        <div style={stagger(2)} className="mt-9 flex flex-wrap gap-3">
                            <Link href={book().url} className="press btn btn-solid">
                                Book a consultation
                            </Link>
                            <Link href={treatmentRoutes.index().url} className="press btn btn-outline">
                                View treatments
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/*
                The mockup's three signature cards on a blush field, lifted over
                the hero's bottom edge so the two read as one composition. The
                middle card sits higher and carries the strongest shadow.
            */}
            {signature.length > 0 && (
                <section aria-label="Signature treatments" className="bg-blush">
                    <ul className="gutter grid gap-5 pt-10 pb-20 md:grid-cols-3 md:gap-6 lg:-mt-20 lg:pt-0 lg:pb-24">
                        {signature.map((t, i) => (
                            <li
                                key={t.id}
                                data-reveal
                                style={stagger(i)}
                                className={cn('relative z-10', i === 1 && 'md:-translate-y-6')}
                            >
                                <Link
                                    href={treatmentRoutes.show(t.slug).url}
                                    className={cn(
                                        'group soft-card hover-lift flex h-full flex-col items-center px-7 pt-9 pb-8 text-center',
                                        i === 1 && 'shadow-lift',
                                    )}
                                >
                                    <h2 className="text-[1.75rem] leading-tight text-cocoa uppercase">{t.name}</h2>
                                    <span className="mt-1.5 text-[0.9375rem] text-clay-ink">{t.category?.name}</span>
                                    {t.image && (
                                        <img
                                            src={t.image}
                                            alt=""
                                            loading="lazy"
                                            className="mt-6 size-28 rounded-full object-cover ring-4 ring-blush"
                                        />
                                    )}
                                    <p className="mt-6 line-clamp-2 max-w-[26ch] text-[0.9375rem] text-text">{t.summary}</p>
                                    <p className="numerals mt-5 font-display text-[1.75rem] text-cocoa">
                                        <span className="mr-1.5 font-sans text-sm text-muted-foreground">from</span>
                                        {price(t)}
                                    </p>
                                    <span className="mt-4 text-[0.9375rem] text-clay-ink underline decoration-clay/40 underline-offset-4 transition-colors group-hover:decoration-clay-ink">
                                        Learn more
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* The mockup's service grid: photo, name, a line, price and a direct way to book. */}
            <section className="gutter py-20 lg:py-28">
                <h2 data-reveal className="text-center text-3xl tracking-[0.06em] text-cocoa uppercase sm:text-[2.6rem]">
                    Our treatments
                </h2>
                <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {grid.map((t, i) => (
                        <li key={t.id} data-reveal style={stagger(i % 3)} className="group flex flex-col">
                            <Link href={treatmentRoutes.show(t.slug).url} className="block overflow-hidden rounded-lg bg-blush">
                                {t.image && (
                                    <img
                                        src={t.image}
                                        alt={`${t.name} at ${clinic.short_name}`}
                                        loading="lazy"
                                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                                    />
                                )}
                            </Link>
                            <h3 className="mt-5 text-2xl text-cocoa">
                                <Link href={treatmentRoutes.show(t.slug).url} className="hover:text-clay-ink">
                                    {t.name}
                                </Link>
                            </h3>
                            <p className="mt-2 line-clamp-2 min-h-[2.9em] text-[0.9375rem] text-text">{t.summary}</p>
                            <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                                <p className="numerals">
                                    <span className="font-display text-2xl text-cocoa">{price(t)}</span>
                                    <span className="ml-2 text-sm text-muted-foreground">{formatDuration(t.duration_minutes)}</span>
                                </p>
                                <Link
                                    href={book({ query: { treatment: t.id } }).url}
                                    className="press rounded-md bg-soft-rose px-4 py-2 text-[0.875rem] font-medium text-cocoa transition-colors hover:bg-blush"
                                >
                                    Book
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-14 text-center">
                    <Link href={treatmentRoutes.index().url} className="press btn btn-outline">
                        All {bookable.length} treatments <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
            </section>

            {/* Booking: the heading on the left, the live card on the right. */}
            <section aria-labelledby="booking-heading" className="bg-soft-rose">
                <div className="gutter grid gap-10 py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
                    <div className="lg:col-span-4">
                        <h2 id="booking-heading" data-reveal className="text-4xl leading-tight text-cocoa sm:text-5xl">
                            Choose a time that suits you.
                        </h2>
                        <p className="mt-5 max-w-sm text-text">
                            Live availability at every branch. We hold the slot while you confirm, and nothing is charged until you have seen your plan.
                        </p>
                        <ul className="mt-8 space-y-3 text-[0.9375rem] text-cocoa">
                            {['No account needed', 'Confirmation by SMS and email', 'Free to reschedule up to 24 hours before'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <Check className="size-4 shrink-0 text-clay-deep" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-8">
                        <AppointmentCard wide treatments={bookable} branches={branches} />
                    </div>
                </div>
            </section>

            {/* The doctor-first promise, beside an offset pair of photographs. */}
            <section className="gutter grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
                <div className="relative pr-10 pb-16 sm:pr-24">
                    <img
                        src={media('doctor-sofia.jpg')}
                        alt="Dr. Sofia Reyes, the clinic's medical director"
                        loading="lazy"
                        className="aspect-[4/5] w-full rounded-xl object-cover"
                    />
                    <img
                        src={media('therapists.jpg')}
                        alt="Two therapists preparing a treatment"
                        loading="lazy"
                        className="absolute right-0 bottom-0 aspect-square w-[46%] rounded-xl border-[6px] border-background object-cover shadow-lift"
                    />
                </div>
                <div>
                    <h2 data-reveal className="text-4xl leading-tight text-cocoa sm:text-5xl">
                        Every plan starts with a doctor.
                    </h2>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-text">
                        Your first visit is an assessment, not a sales conversation. A licensed physician looks at your skin, listens to what you want, and writes a plan you keep, with costs agreed before anything begins.
                    </p>
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                        {[
                            ['Physician-led', 'Every treatment is led or supervised by a doctor.'],
                            ['Written plans', 'Steps, sessions and prices, in writing.'],
                            ['Medical-grade only', 'Registered products and current devices.'],
                            ['Private records', 'Handled under the Data Privacy Act.'],
                        ].map(([title, text]) => (
                            <li key={title} className="border-t border-border pt-4">
                                <p className="font-medium text-cocoa">{title}</p>
                                <p className="mt-1 text-[0.9375rem] text-text">{text}</p>
                            </li>
                        ))}
                    </ul>
                    <Link href={about().url} className="mt-10 inline-flex items-center gap-2 font-medium text-clay-ink hover:text-cocoa">
                        Meet the team <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
            </section>

            {/* Reviews, as a row the hand can flick through. */}
            {testimonials.length > 0 && (
                <section className="bg-blush py-20 lg:py-28">
                    <div className="gutter flex flex-wrap items-end justify-between gap-6">
                        <h2 data-reveal className="text-4xl text-cocoa sm:text-5xl">
                            In our patients’ words
                        </h2>
                        <p className="numerals flex items-center gap-2 text-[0.9375rem] text-text">
                            <span className="flex text-clay-deep" aria-hidden="true">
                                {[0, 1, 2, 3, 4].map((n) => (
                                    <Star key={n} className="size-4 fill-current" />
                                ))}
                            </span>
                            {(testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)} average from {testimonials.length} reviews
                        </p>
                    </div>
                    <ul className="mt-12 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:px-8 lg:scroll-px-[max(3rem,calc((100%-82rem)/2))] lg:px-[max(3rem,calc((100%-82rem)/2))]">
                        {testimonials.map((t) => (
                            <li key={t.id} className="soft-card flex w-[85%] shrink-0 snap-start flex-col justify-between p-8 sm:w-[24rem]">
                                <blockquote className="font-display text-[1.35rem] leading-snug text-cocoa">“{t.quote}”</blockquote>
                                <p className="mt-8 flex items-center gap-3 text-[0.9375rem]">
                                    <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-soft-rose font-display text-lg text-clay-ink">
                                        {t.author_name.charAt(0)}
                                    </span>
                                    <span>
                                        <span className="block font-medium text-cocoa">{t.author_name}</span>
                                        <span className="text-muted-foreground">{t.author_meta}</span>
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Before and after, labelled illustrative. */}
            <section className="gutter grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
                <div className="lg:col-span-5">
                    <h2 data-reveal className="text-4xl leading-tight text-cocoa sm:text-5xl">
                        See what a plan can change.
                    </h2>
                    <p className="mt-6 max-w-md text-text">
                        Drag the handle to compare. This image is illustrative; real before and after photos are shared only with written patient consent, during your consultation.
                    </p>
                    <p className="mt-4 max-w-md text-sm text-muted-foreground">Results vary from person to person. Your doctor will explain what to expect for your skin.</p>
                    <Link href={beforeAfter().url} className="mt-8 inline-flex items-center gap-2 font-medium text-clay-ink hover:text-cocoa">
                        More examples <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
                <div className="lg:col-span-7">
                    <BeforeAfter before={media('ba-before.jpg')} after={media('ba-after.jpg')} alt="Illustrative portrait showing duller, uneven skin before and brighter, even skin after a skin booster plan" />
                </div>
            </section>

            {/* Every category as a photograph, the names set beneath. */}
            <section className="bg-soft-rose py-20 lg:py-28">
                <div className="gutter">
                    <h2 data-reveal className="max-w-xl text-4xl leading-tight text-cocoa sm:text-5xl">
                        Care for face, body, hair and wellbeing.
                    </h2>
                    <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
                        {categories.map((c, i) => (
                            <li key={c.id} data-reveal style={stagger(i % 6)}>
                                <Link href={`${treatmentRoutes.index().url}#${c.slug}`} className="group block">
                                    <span className="block overflow-hidden rounded-lg bg-blush">
                                        {c.image && (
                                            <img
                                                src={c.image}
                                                alt=""
                                                loading="lazy"
                                                className="aspect-[3/4] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                                            />
                                        )}
                                    </span>
                                    <span className="mt-4 block font-display text-xl text-cocoa group-hover:text-clay-ink">{c.name}</span>
                                    <span className="numerals text-sm text-muted-foreground">{c.treatments_count} treatments</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* The platform under the clinic, credited to its makers. */}
            <section className="gutter grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
                <div className="lg:col-span-5">
                    <h2 data-reveal className="text-4xl leading-tight text-cocoa sm:text-5xl">
                        This clinic runs on one platform.
                    </h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-text">
                        Every booking you make here lands in the clinic’s own system: the agenda, patient records, point of sale, stock, accounting and payroll. The Aesthetic Clinic SaaS Platform is designed and built by the recursive-frog.com team.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link href={login().url} className="press btn btn-solid">
                            Explore the admin
                        </Link>
                        <Link href={platform().url} className="press btn btn-outline">
                            See every module
                        </Link>
                    </div>
                </div>
                <div className="lg:col-span-7">
                    <Link href={platform().url} className="group block overflow-hidden rounded-xl border border-border bg-white shadow-lift">
                        <img
                            src={media('platform-dashboard.jpg')}
                            alt="The clinic dashboard: revenue, bookings and patient trends for the last 30 days"
                            loading="lazy"
                            className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]"
                        />
                    </Link>
                </div>
            </section>

            <EnquiryBand treatments={bookable} image={media('portrait-calm.jpg')} />
        </>
    );
}

function EnquiryBand({ treatments, image }: { treatments: Treatment[]; image: string }) {
    const form = useForm({
        form: 'enquiry',
        first_name: '',
        phone: '',
        email: '',
        treatment_id: '',
        message: '',
        privacy_consent: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post(leads.store().url, {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const field =
        'mt-1.5 h-12 w-full rounded-md border border-input bg-white px-4 text-[0.9375rem] text-cocoa placeholder:text-muted-foreground focus:border-clay focus:outline-none';

    return (
        <section id="enquire" className="scroll-mt-24 bg-blush">
            <div className="gutter grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
                <div className="lg:col-span-5">
                    <img src={image} alt="" loading="lazy" className="hidden aspect-[4/5] w-full rounded-xl object-cover lg:block" />
                </div>
                <div className="lg:col-span-7">
                    <h2 className="text-4xl text-cocoa sm:text-5xl">Not sure where to start?</h2>
                    <p className="mt-5 max-w-lg text-text">
                        Tell us what you would like to change. A patient coordinator replies within one business day with a suggested first step.
                    </p>
                    <form onSubmit={submit} className="mt-10 grid gap-5 sm:grid-cols-2" noValidate>
                        <div>
                            <label htmlFor="enq-name" className="text-sm font-medium text-cocoa">
                                First name
                            </label>
                            <input id="enq-name" autoComplete="given-name" value={form.data.first_name} onChange={(e) => form.setData('first_name', e.target.value)} className={field} />
                            {form.errors.first_name && (
                                <p role="alert" className="mt-1 text-[0.8125rem] text-clay-ink">
                                    {form.errors.first_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="enq-phone" className="text-sm font-medium text-cocoa">
                                Mobile number
                            </label>
                            <input
                                id="enq-phone"
                                type="tel"
                                autoComplete="tel"
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                className={field}
                                placeholder="0917 123 4567"
                            />
                        </div>
                        <div>
                            <label htmlFor="enq-email" className="text-sm font-medium text-cocoa">
                                Email <span className="font-normal text-muted-foreground">(optional)</span>
                            </label>
                            <input id="enq-email" type="email" autoComplete="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} className={field} />
                            {form.errors.email && (
                                <p role="alert" className="mt-1 text-[0.8125rem] text-clay-ink">
                                    {form.errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="enq-treatment" className="text-sm font-medium text-cocoa">
                                Interested in
                            </label>
                            <select id="enq-treatment" value={form.data.treatment_id} onChange={(e) => form.setData('treatment_id', e.target.value)} className={cn(field, 'cursor-pointer')}>
                                <option value="">Not sure yet</option>
                                {treatments.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="enq-message" className="text-sm font-medium text-cocoa">
                                What would you like help with?
                            </label>
                            <textarea id="enq-message" rows={4} value={form.data.message} onChange={(e) => form.setData('message', e.target.value)} className={cn(field, 'h-auto py-3')} />
                        </div>
                        <label className="flex items-start gap-3 text-[0.875rem] text-text sm:col-span-2">
                            <input type="checkbox" checked={form.data.privacy_consent} onChange={(e) => form.setData('privacy_consent', e.target.checked)} className="mt-1" />
                            <span>I agree that the clinic may contact me about my enquiry and process my details under its privacy notice.</span>
                        </label>
                        {form.errors.privacy_consent && (
                            <p role="alert" className="-mt-2 text-[0.8125rem] text-clay-ink sm:col-span-2">
                                {form.errors.privacy_consent}
                            </p>
                        )}
                        <div className="sm:col-span-2">
                            <button type="submit" disabled={form.processing} className="press btn btn-solid disabled:opacity-50">
                                {form.processing ? 'Sending...' : 'Send enquiry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
