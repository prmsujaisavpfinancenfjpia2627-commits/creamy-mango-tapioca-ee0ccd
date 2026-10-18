import { useState } from 'react'
import { PRODUCT } from '../lib/product'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1)
  const [fulfillment, setFulfillment] = useState<'Pickup' | 'Delivery'>('Pickup')
  const [status, setStatus] = useState<Status>('idle')
  const [customer, setCustomer] = useState('')

  const total = quantity * PRODUCT.price
  const setQty = (n: number) => setQuantity(Math.max(1, Math.min(200, n || 1)))

  if (status === 'sent') {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-cocoa/10 md:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-custard text-3xl">
          🥭
        </div>
        <h3 className="font-display text-3xl font-semibold">Salamat, {customer}!</h3>
        <p className="mx-auto mt-3 max-w-sm text-cocoa-soft">
          Your order for {quantity} cup{quantity > 1 ? 's' : ''} (₱{total}) has been
          received. We'll contact you shortly to confirm.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setQuantity(1)
          }}
          className="mt-8 rounded-full border border-cocoa/20 px-6 py-2.5 font-semibold transition hover:bg-custard"
        >
          Place another order
        </button>
      </div>
    )
  }

  return (
    <form
      name="order"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cocoa/10 md:p-8"
      onSubmit={async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        setCustomer(String(data.get('name') ?? '').split(' ')[0])
        setStatus('sending')
        try {
          const res = await fetch('/__forms.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data as never).toString(),
          })
          setStatus(res.ok ? 'sent' : 'error')
        } catch {
          setStatus('error')
        }
      }}
    >
      <input type="hidden" name="form-name" value="order" />
      <input
        type="hidden"
        name="subject"
        value={`New Dolce Dessert order: ${quantity} cup${quantity > 1 ? 's' : ''} (₱${total})`}
      />
      <input type="hidden" name="total" value={`₱${total}`} />
      <input type="hidden" name="fulfillment" value={fulfillment} />
      <p className="hidden" style={{ display: 'none' }}>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="flex items-center gap-4 rounded-2xl bg-cream p-4">
        <img
          src="/.netlify/images?url=/img/mango-tapioca.png&w=160&fm=webp"
          alt=""
          className="h-16 w-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold">{PRODUCT.name}</p>
          <p className="text-sm text-cocoa-soft">
            {PRODUCT.size} cup · ₱{PRODUCT.price} each
          </p>
        </div>
        <div className="flex items-center rounded-full bg-white ring-1 ring-cocoa/15">
          <button
            type="button"
            aria-label="Remove one cup"
            onClick={() => setQty(quantity - 1)}
            className="h-10 w-10 rounded-full text-xl font-semibold transition hover:bg-custard"
          >
            −
          </button>
          <input
            type="number"
            name="quantity"
            min={1}
            max={200}
            value={quantity}
            onChange={(e) => setQty(Number(e.target.value))}
            aria-label="Number of cups"
            className="w-12 bg-transparent text-center font-semibold [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Add one cup"
            onClick={() => setQty(quantity + 1)}
            className="h-10 w-10 rounded-full text-xl font-semibold transition hover:bg-custard"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Full name</label>
          <input id="name" name="name" required className="field" placeholder="Juan Dela Cruz" />
        </div>
        <div>
          <label htmlFor="phone" className="label">Mobile number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            pattern="[0-9+\-\s]{10,15}"
            className="field"
            placeholder="0917 123 4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label">
          Email <span className="font-normal text-cocoa-soft">(optional)</span>
        </label>
        <input id="email" name="email" type="email" className="field" placeholder="you@example.com" />
      </div>

      <fieldset>
        <legend className="label">Pickup or delivery?</legend>
        <div className="grid grid-cols-2 gap-3">
          {(['Pickup', 'Delivery'] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              aria-pressed={fulfillment === opt}
              onClick={() => setFulfillment(opt)}
              className={`rounded-xl border px-4 py-3 font-semibold transition ${
                fulfillment === opt
                  ? 'border-mango bg-custard text-cocoa'
                  : 'border-cocoa/15 bg-white text-cocoa-soft hover:border-mango/60'
              }`}
            >
              {opt === 'Pickup' ? '🛍️ Pickup' : '🛵 Delivery'}
            </button>
          ))}
        </div>
      </fieldset>

      {fulfillment === 'Delivery' && (
        <div>
          <label htmlFor="address" className="label">Delivery address</label>
          <textarea
            id="address"
            name="address"
            rows={2}
            required
            className="field resize-none"
            placeholder="House no., street, barangay, city / landmark"
          />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="label">Preferred date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={new Date().toISOString().slice(0, 10)}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="time" className="label">Preferred time</label>
          <select id="time" name="time" required className="field" defaultValue="">
            <option value="" disabled>Select a time…</option>
            <option>Morning (9AM – 12NN)</option>
            <option>Afternoon (12NN – 3PM)</option>
            <option>Late afternoon (3PM – 6PM)</option>
            <option>Evening (6PM – 8PM)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="payment" className="label">Payment method</label>
        <select id="payment" name="payment" required className="field" defaultValue="Cash">
          <option>Cash</option>
          <option>GCash</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="label">
          Notes <span className="font-normal text-cocoa-soft">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          className="field resize-none"
          placeholder="Anything we should know?"
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-cocoa/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-cocoa-soft">
            {quantity} × ₱{PRODUCT.price}
          </p>
          <p className="font-display text-3xl font-semibold">Total: ₱{total}</p>
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-mango px-8 py-4 font-semibold text-cocoa shadow-[0_8px_24px_-8px_rgba(224,122,16,0.7)] transition hover:bg-mango-deep hover:text-cream disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending order…' : 'Place order'}
        </button>
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Sorry, we couldn't send your order. Please check your connection and try again.
        </p>
      )}
    </form>
  )
}
