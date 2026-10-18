import { createFileRoute } from '@tanstack/react-router'
import OrderForm from '../components/OrderForm'
import { PRODUCT } from '../lib/product'

export const Route = createFileRoute('/')({
  component: Home,
})

const heroImg = (w: number) =>
  `/.netlify/images?url=/img/mango-tapioca.png&w=${w}&fm=webp`

function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <a href="/" className="font-display text-2xl font-semibold italic tracking-tight">
          dolce <span className="text-mango-deep">dessert</span>
        </a>
        <a
          href="#order"
          className="rounded-full bg-cocoa px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-mango-deep"
        >
          Order now
        </a>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:pt-12">
          <div>
            <p className="mb-4 inline-block rounded-full bg-custard px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mango-deep">
              Freshly made · {PRODUCT.size}
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Creamy Mango <em className="text-mango-deep">Tapioca</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa-soft">
              Sweet ripe mangoes, chewy pearls and gulaman folded into a silky
              blend of milk and cream. Chilled, generous, and made to order.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <span className="font-display text-5xl font-semibold">₱{PRODUCT.price}</span>
                <span className="ml-2 text-cocoa-soft">per {PRODUCT.size} cup</span>
              </div>
              <a
                href="#order"
                className="rounded-full bg-mango px-7 py-3.5 font-semibold text-cocoa shadow-[0_8px_24px_-8px_rgba(224,122,16,0.7)] transition hover:-translate-y-0.5 hover:bg-mango-deep hover:text-cream"
              >
                Place your order →
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rotate-3 rounded-[2.5rem] bg-custard" />
            <img
              src={heroImg(900)}
              srcSet={`${heroImg(600)} 600w, ${heroImg(900)} 900w, ${heroImg(1200)} 1200w`}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="A cup of creamy mango tapioca with mango cubes, pearls and gulaman"
              className="aspect-square w-full rounded-[2rem] object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white px-5 py-3 shadow-lg md:-left-8">
              <p className="text-xs font-bold uppercase tracking-widest text-cocoa-soft">Only</p>
              <p className="font-display text-2xl font-semibold">₱{PRODUCT.price} / cup</p>
            </div>
          </div>
        </section>

        <section className="border-y border-cocoa/10 bg-white/60">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="font-display text-3xl font-semibold">What's inside every cup</h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PRODUCT.ingredients.map((item) => (
                <li
                  key={item.name}
                  className="rounded-2xl border border-cocoa/10 bg-cream p-5"
                >
                  <span className="text-3xl" aria-hidden>{item.emoji}</span>
                  <p className="mt-3 font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-cocoa-soft">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="order" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="font-display text-4xl font-semibold leading-tight">
                Order your <em className="text-mango-deep">mango tapioca</em>
              </h2>
              <p className="mt-4 text-cocoa-soft">
                Fill in the form and we'll receive your order right away. We'll
                text or call you to confirm the details and schedule.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  'Choose how many cups you want',
                  'Pick pickup or delivery and your preferred time',
                  'We confirm your order by text or call',
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mango font-bold">
                      {i + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <OrderForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-cocoa/10 py-8 text-center text-sm text-cocoa-soft">
        © {new Date().getFullYear()} Dolce Dessert · Creamy Mango Tapioca, made with love
      </footer>
    </div>
  )
}
