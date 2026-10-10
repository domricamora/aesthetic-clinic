import { Form, Head, router, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { login as passkeyLogin, loginOptions } from '@/routes/passkey';
import PasskeyVerify from '@/components/passkey-verify';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

/** The showcase logins, one click each. Every demo account uses the password "password". */
const DEMO: [string, string, string][] = [
    ['Owner', 'owner@aesthetic-clinic.test', 'Dashboard, money, stock and people'],
    ['Front desk', 'reception@aesthetic-clinic.test', 'Agenda, leads, chat and the till'],
    ['Super admin', 'admin@aesthetic-clinic.test', 'Everything, settings included'],
];

export default function Login({ status, canResetPassword }: Props) {
    const prefill = new URLSearchParams(usePage().url.split('?')[1] ?? '').get('email') ?? '';

    return (
        <>
            <Head title="Log in" />

            {/* The passkey package defaults to /passkeys/... on the domain root,
                which 404s while the app is served from /beautyclinic/public. */}
            <PasskeyVerify
                routes={{
                    options: loginOptions(),
                    submit: passkeyLogin(),
                }}
            />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    defaultValue={prefill}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        <section aria-labelledby="demo-heading" className="rounded-lg border border-border bg-soft-rose p-4">
                            <h2 id="demo-heading" className="text-sm font-medium">
                                Exploring the demo? Sign in as
                            </h2>
                            <ul className="mt-3 grid gap-2">
                                {DEMO.map(([role, email, sees]) => (
                                    <li key={email}>
                                        <button
                                            type="button"
                                            disabled={processing}
                                            onClick={() => router.post(store.url(), { email, password: 'password', remember: true })}
                                            className="press flex w-full items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-clay disabled:opacity-50"
                                        >
                                            <span>
                                                <span className="block text-sm font-medium">{role}</span>
                                                <span className="block text-xs text-muted-foreground">{sees}</span>
                                            </span>
                                            <span className="text-xs text-clay-ink">Sign in</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={register()} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Sign in to the clinic desk.',
};
