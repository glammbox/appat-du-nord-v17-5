import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { products } from '../lib/products'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  locale: 'fr' | 'en'
  onCartChange: () => void
}

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  bucktail:   '/images/lures/bucktail.jpg',
  crankbait:  '/images/lures/crankbait.jpg',
  jig:        '/images/lures/jig.jpg',
  topwater:   '/images/lures/topwater.jpg',
  spinner:    '/images/lures/spinner.jpg',
  swimbait:   '/images/lures/swimbait.jpg',
  'glide-bait': '/images/lures/glide-bait.jpg',
  softbait:   '/images/lures/softbait.jpg',
  cuillere:   '/images/lures/cuillere.jpg',
  equipement: '/images/lures/rod.jpg',
}

function getProductImage(item: CartItem): string {
  const p = products.find(p => p.id === item.id)
  if (p?.imageFile) return `/images/lures/${p.imageFile}`
  if (p?.type) return CATEGORY_PLACEHOLDERS[p.type] || '/images/lures/bucktail.jpg'
  return '/images/lures/bucktail.jpg'
}

function getCartItems(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem('appat-cart') || '[]')
  } catch {
    return []
  }
}

function saveCartItems(items: CartItem[]) {
  localStorage.setItem('appat-cart', JSON.stringify(items))
}

export function CartDrawer({ open, onClose, locale, onCartChange }: CartDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const items = getCartItems()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const updateQty = (id: string, delta: number) => {
    const cart = getCartItems()
    const item = cart.find(i => i.id === id)
    if (!item) return
    item.qty += delta
    const filtered = cart.filter(i => i.qty > 0)
    saveCartItems(filtered)
    onCartChange()
  }

  const removeItem = (id: string) => {
    const cart = getCartItems().filter(i => i.id !== id)
    saveCartItems(cart)
    onCartChange()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,8,16,0.72)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 3000,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(380px, 100vw)',
              background: '#050810',
              borderLeft: '1px solid rgba(0,207,255,0.25)',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.6), -1px 0 0 rgba(0,207,255,0.1)',
              zIndex: 3001,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(0,207,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  color: '#00CFFF',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: '0.2rem',
                }}>
                  {locale === 'fr' ? '⚡ Boutique' : '⚡ Shop'}
                </div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: '#F5F7FA',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? 'Panier' : 'Cart'}
                  {items.length > 0 && (
                    <span style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.8rem',
                      color: '#00CFFF',
                      fontWeight: 700,
                    }}>
                      ({items.reduce((s, i) => s + i.qty, 0)})
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#8899AA',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,207,255,0.12)'
                  ;(e.currentTarget as HTMLElement).style.color = '#00CFFF'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,207,255,0.35)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                  ;(e.currentTarget as HTMLElement).style.color = '#8899AA'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Items list */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem 1.5rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#00CFFF rgba(255,255,255,0.05)',
            }}>
              {items.length === 0 ? (
                <div style={{
                  padding: '3rem 0',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.4 }}>🛒</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '1rem',
                    color: '#5B6F85',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {locale === 'fr' ? 'Panier vide' : 'Empty cart'}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '10px',
                        padding: '0.75rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#0A1020',
                        border: '1px solid rgba(255,255,255,0.06)',
                        flexShrink: 0,
                      }}>
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          color: '#E8EDF5',
                          lineHeight: 1.3,
                          marginBottom: '0.25rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {item.name}
                        </div>
                        <div style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#00CFFF',
                        }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                      {/* Qty controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        flexShrink: 0,
                      }}>
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{
                            width: '26px', height: '26px',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#F5F7FA',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: '#F5F7FA',
                          minWidth: '20px',
                          textAlign: 'center',
                        }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{
                            width: '26px', height: '26px',
                            background: 'rgba(0,207,255,0.12)',
                            border: '1px solid rgba(0,207,255,0.3)',
                            color: '#00CFFF',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{
                            width: '26px', height: '26px',
                            background: 'transparent',
                            border: '1px solid rgba(255,50,50,0.2)',
                            color: 'rgba(255,80,80,0.7)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginLeft: '0.1rem',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid rgba(0,207,255,0.12)',
                flexShrink: 0,
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    color: '#8899AA',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}>
                    {locale === 'fr' ? 'Sous-total' : 'Subtotal'}
                  </span>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: '#00CFFF',
                    letterSpacing: '0.04em',
                  }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.5rem',
                    background: 'linear-gradient(135deg, #00CFFF 0%, #0088CC 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#050810',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,207,255,0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,207,255,0.5)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,207,255,0.35)'
                  }}
                >
                  {locale === 'fr' ? 'Procéder au paiement →' : 'Proceed to Checkout →'}
                </button>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  color: '#5B6F85',
                  textAlign: 'center',
                  marginTop: '0.75rem',
                }}>
                  {locale === 'fr' ? 'Liens affiliés Amazon.ca' : 'Amazon.ca affiliate links'}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
