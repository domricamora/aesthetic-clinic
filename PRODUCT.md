# Product

<!-- impeccable:product-schema 1 -->

> Source: owner brief of 2026-10-10, the mockup at `C:\Users\Nick\Downloads\aesthetic\mockup.jpg`, the feature spec `plan.md`, and the owner's standing rules.

## Platform

web

## Users

- **Clinic owners evaluating the product (primary).** Owners and managers of aesthetic clinics in Southeast Asia watching a sales demo of the Aesthetic Clinic SaaS Platform. Their job: judge in minutes whether this is an established, premium clinic operating system and whether it would run their clinic.
- **Prospective patients (the audience the demo site plays to).** Adults in Metro Manila considering facial, injectable, laser, body and wellness treatments. Phone first; compare treatments and prices; book without calling or registering.
- **Clinic staff (admin side).** Receptionists, practitioners, cashiers, inventory and branch managers, the owner and the accountant.

## Product Purpose

Aesthetic Clinic is the showcase tenant of the **Aesthetic Clinic SaaS Platform, created by the recursive-frog.com team**. It shows the full clinic operating system: marketing site, online booking, CRM, chat, POS, inventory, accounting, HR and payroll, with KPI analytics. Every screen runs on 12 months of seeded data so it looks like a busy, real clinic. Success: a prospect clicks through the live site and admin and wants to talk to recursive-frog.com.

## Positioning

One system from the first website visit to treatment, payment, stock and payroll, built for Philippine and Southeast Asian clinics (peso pricing, GCash/Maya, Data Privacy Act-aware handling). Made by recursive-frog.com, and the site says so plainly.

## Operating Context

- Live demo at https://aesthetic-clinic.recursive-frog.com, shown on laptops and phones; local copy at http://localhost/beautyclinic/public.
- Patients book by treatment, branch, practitioner, date and time, as a guest.
- Every website conversion creates a CRM lead with UTM and source data.

## Capabilities and Constraints

- Stack: Laravel 13, Inertia 3, React 19, TypeScript, Tailwind 4, MySQL.
- Content is database-driven. Brand values live in `config/clinic.php` and the `@theme` tokens.
- No medical claims: no guaranteed results, "100% safe", "permanent" or superiority claims. Not advertised as BIR compliant.

## Brand Commitments

- Name: Aesthetic Clinic (wordmark "aesthetic-clinic"). Fictional demo clinic.
- Look and feel from the mockup: warm ivory and blush fields, a rose-clay primary for actions, deep cocoa ink, classical serif display type, soft cards with gentle shadows, full-bleed photographic hero. Improve on it, never template it.
- **Soft rounded corners** (about 8px) on cards, buttons and inputs: the owner chose this for this project, overriding the global square-corner rule. Avatars stay circular.
- Full width, never boxed. Restrained palette: one primary, one accent. Motion under 300 ms ease-out, reduced-motion safe. No em-dashes in UI copy.
- Media: real royalty-free photos and a hero video featuring Asian practitioners and patients, stored in the repo and credited.
- Attribution: "Platform by recursive-frog.com" in the site footer, admin, login and meta.

## Evidence on Hand

- No real patients, reviews, results, press or certifications. Testimonials and practitioner profiles are fictional; before/after imagery labelled illustrative.

## Product Principles

1. Book first: every page leads to a booking in as few steps as possible, no forced sign-up.
2. Trust through restraint: calm, warm precision over hype.
3. Privacy is visible: consent and data handling named plainly.
4. The demo is real: every screen runs on seeded data through the actual backend.

## Accessibility & Inclusion

WCAG AA contrast, keyboard navigation, visible focus, labelled forms, reduced-motion support. English copy for a Philippine audience.
