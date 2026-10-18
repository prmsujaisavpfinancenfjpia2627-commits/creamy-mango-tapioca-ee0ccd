# Dolce Dessert

Online ordering page for **Dolce Dessert's Creamy Mango Tapioca** — 150ml cups for ₱35, made with mango, evaporated and condensed milk, Nestlé Cream, pearls and gulaman.

Customers choose how many cups they want, pick pickup or delivery, set a preferred date and time, choose Cash or GCash, and place the order. Each order is saved by Netlify Forms and sent to the owner by email.

## Tech

- TanStack Start (React 19) + Tailwind CSS v4
- Netlify Forms for order capture and email notifications
- Netlify Image CDN for the product photo

## Run locally

```bash
pnpm install
netlify dev
```

## Receiving orders by email

In the Netlify dashboard go to **Project configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**, choose the `order` form, and enter the email address that should receive orders. All orders are also listed under **Forms → order** in the dashboard.
