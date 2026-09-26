import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="label-mono text-accent-strong">404 · No rows returned</p>
      <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] font-semibold">This page isn&apos;t in the dataset.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The link may be old or mistyped. The work is all on the home page.</p>
      <ButtonLink href="/" size="lg" className="mt-8">
        Back to the portfolio
      </ButtonLink>
    </main>
  );
}
