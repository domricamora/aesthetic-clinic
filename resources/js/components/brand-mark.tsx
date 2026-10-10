import { cn } from '@/lib/utils';

/*
 * The brand mark: three nested sweeping arcs on a rounded clay square.
 * Same geometry as scripts/build-mark.php, which renders the favicons;
 * change both together.
 */
const ARCS = ['M17 44Q24 24 47 18', 'M23 47Q30 32 47 27', 'M29 50Q36 40 47 36'];

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
            <g
                fill="none"
                stroke="var(--color-canvas)"
                strokeWidth="3.4"
                strokeLinecap="round"
            >
                {ARCS.map((d) => (
                    <path key={d} d={d} />
                ))}
            </g>
        </svg>
    );
}
