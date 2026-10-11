import { cn } from '@/lib/utils';

/*
 * The brand mark: a single-storey "a" on a rounded clay square, its stem
 * sweeping out to a calligraphic point at the top and a tail at the foot.
 * Same geometry as scripts/build-mark.php, which renders the favicons;
 * change both together.
 */
const STEM =
    'M17 19.5Q42.2 14 42.2 31L42.2 42Q42.2 47 46 48Q38.5 50 37.2 44L37.2 31Q37.2 20 17 19.5Z';

export default function BrandMark({
    className,
    title,
}: {
    className?: string;
    title?: string;
}) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={cn('shrink-0', className)}
            role={title ? 'img' : undefined}
            aria-hidden={title ? undefined : true}
            aria-label={title}
        >
            <rect width="64" height="64" rx="15" fill="var(--color-clay-deep)" />
            <circle
                cx="30"
                cy="38.5"
                r="8.8"
                fill="none"
                stroke="var(--color-canvas)"
                strokeWidth="4.4"
            />
            <path d={STEM} fill="var(--color-canvas)" />
        </svg>
    );
}
