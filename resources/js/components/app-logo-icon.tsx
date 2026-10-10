import { usePage } from '@inertiajs/react';
import BrandMark from '@/components/brand-mark';
import type { Clinic } from '@/types';

/** The brand mark on its own (sign-in screens, app header), named for screen readers. */
export default function AppLogoIcon({ className }: { className?: string }) {
    const { clinic } = usePage<{ clinic: Clinic }>().props;

    return <BrandMark className={className} title={clinic.name} />;
}
