import React, { useRef } from 'react'

export default function ParallaxScene({ children }) {
  const sceneRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = sceneRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    const layers = sceneRef.current.querySelectorAll('[data-layer]')
    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-layer')) || 0
      const translateX = x * depth * -30
      const translateY = y * depth * -30
      layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
    })
  }

  const onMouseLeave = () => {
    const layers = sceneRef.current.querySelectorAll('[data-layer]')
    layers.forEach((layer) => {
      layer.style.transform = 'translate3d(0,0,0)'
    })
  }

  return (
    <div
      ref={sceneRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full"
    >
      {children}
    </div>
  )
}
