# Dolce Dessert — order page

A single-page ordering site for Dolce Dessert's Creamy Mango Tapioca (150ml cup, ₱35). Customers fill in an order form; submissions are captured by Netlify Forms and emailed to the owner via a Netlify form-submission email notification (configured in the Netlify dashboard, not in code).

## Architecture

- TanStack Start + React 19, Tailwind CSS v4, deployed on Netlify (`netlify.toml`, `@netlify/vite-plugin-tanstack-start`).
- `src/lib/product.ts` — single source of truth for product name, size, price and ingredients. Change the price here.
- `src/routes/index.tsx` — landing page: hero, ingredients, order section.
- `src/components/OrderForm.tsx` — order form (quantity stepper, pickup/delivery, schedule, payment, live total, success/error states).
- `public/__forms.html` — hidden static copy of the `order` form so Netlify detects it at deploy time. **Every field the component submits must also exist here.**
- `src/styles.css` — theme tokens (`mango`, `custard`, `cocoa`, `cream`) and `.field` / `.label` helpers. Fonts: Fraunces (display) + DM Sans, loaded in `src/routes/__root.tsx`.
- `public/img/mango-tapioca.png` — generated product photo; always reference it through the Image CDN (`/.netlify/images?url=/img/mango-tapioca.png&w=…&fm=webp`).

## Non-obvious decisions

- The form POSTs URL-encoded data to `/__forms.html`, not `/`, because `/` is handled by the SSR function and would never reach Netlify Forms.
- `subject`, `total` and `fulfillment` are hidden fields computed from component state; `subject` sets the notification email subject line. The optional `email` field becomes the reply-to address.
- No database: Netlify Forms stores submissions (viewable in the dashboard) and handles email delivery.
