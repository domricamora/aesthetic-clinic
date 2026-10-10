import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * The hero film: one pre-edited, muted loop of four clinic clips (see
 * public/media/video/CREDITS.md). Reduced-motion visitors get its still.
 *
 * `inset` true makes it a full-bleed background behind its section; false
 * fills its parent, which must then have a height.
 */
export default function HeroVideo({
    inset = true,
    className,
}: {
    inset?: boolean;
    className?: string;
}) {
    const { mediaUrl } = usePage().props;
    const base = `${mediaUrl.replace(/photos$/, 'video')}/hero-clinic`;
    const [still, setStill] = useState(false);

    useEffect(() => {
        setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    return (
        <div
            aria-hidden="true"
            className={cn(inset ? 'absolute inset-0 -z-20' : 'h-full w-full', className)}
        >
            {still ? (
                <img src={`${base}.jpg`} alt="" className="h-full w-full object-cover" />
            ) : (
                <video
                    src={`${base}.mp4`}
                    poster={`${base}.jpg`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onError={() => setStill(true)}
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}
