import React from 'react'

export default function Price({currency, price}) {
  return (
    <div>
      {currency}
      <span>{price}</span>
    </div>
  )
}
