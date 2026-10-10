import { usePage } from '@inertiajs/react';
import BrandMark from '@/components/brand-mark';
import { cn } from '@/lib/utils';
import type { Clinic } from '@/types';

/**
 * The lockup: the mark beside the name set as one lowercase, hyphenated word
 * ("Aesthetic Clinic" becomes "aesthetic-clinic"), the hyphen in clay. The
 * name follows `clinic.name`, so a rename in config renames the lockup.
 *
 * `name` overrides the text; the admin rail passes the short name and a
 * descriptor. The mark is decorative whenever the name is in text beside it.
 */
export default function Wordmark({
    name,
    descriptor,
    className,
    markClassName,
    nameClassName,
}: {
    name?: string | null;
    descriptor?: string;
    className?: string;
    markClassName?: string;
    nameClassName?: string;
}) {
    const { clinic } = usePage<{ clinic: Clinic }>().props;
    const text = name === undefined ? clinic.name.toLowerCase().trim().replace(/\s+/g, '-') : (name ?? '');
    const [head, ...rest] = text.split('-');

    return (
        <span className={cn('inline-flex items-center gap-2.5', className)}>
            <BrandMark className={markClassName ?? 'size-9'} title={text ? undefined : clinic.name} />
            {text && (
                <span className="flex min-w-0 flex-col">
                    <span
                        className={cn(
                            'font-display text-[1.45rem] leading-none tracking-[-0.01em] text-cocoa',
                            nameClassName,
                        )}
                    >
                        {head}
                        {rest.length > 0 && (
                            <>
                                <span className="text-clay">-</span>
                                {rest.join('-')}
                            </>
                        )}
                    </span>
                    {descriptor && (
                        <span className="mt-1 text-[0.625rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                            {descriptor}
                        </span>
                    )}
                </span>
            )}
        </span>
    );
}
