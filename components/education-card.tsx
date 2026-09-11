'use client'

import { useEffect, useState } from 'react'

/* A credential card built on the product-card silhouette: dark rounded slab,
   light image panel inset at the top, a circular mark in the panel's corner,
   then title and issuer stacked underneath. The reference's price row and
   add-to-cart button are dropped — nothing here is for sale. */

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.2 2.6 8.6 12 13l9.4-4.4L12 4.2Z"
        fill="currentColor"
      />
      <path
        d="M6.2 11.2v4.1c0 1.6 2.6 2.9 5.8 2.9s5.8-1.3 5.8-2.9v-4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20.4 9.4v5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="9.6"
        r="5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9.6 8.1v3.9M9.6 8.1h2.2a1.5 1.5 0 0 1 0 3H9.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.7 15.4 7.4 21l4.6-2.3L16.6 21l-1.3-5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const icons = { cap: CapIcon, seal: SealIcon }

export function EducationCard({
  title,
  brand,
  image,
  icon = 'cap',
  alt,
}: {
  title: string
  brand: string
  image?: string
  icon?: keyof typeof icons
  alt?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const Mark = icons[icon]

  useEffect(() => {
    if (!image) return
    const probe = new window.Image()
    probe.onload = () => setLoaded(true)
    probe.src = image
  }, [image])

  return (
    <article className="np-cred">
      <div className="np-cred-frame">
        {image && loaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="np-cred-img" src={image} alt={alt ?? title} />
        ) : (
          <span className="np-cred-drop">
            DROP IMAGE
            <br />
            public{image}
          </span>
        )}
        <span className="np-cred-badge" aria-hidden="true">
          <Mark />
        </span>
      </div>
      <h3 className="np-cred-title" title={title}>
        {title}
      </h3>
      <p className="np-cred-brand">{brand}</p>
    </article>
  )
}
