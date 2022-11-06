import React from 'react'
import { IconButton, Badge, ShoppingBagOutlinedIcon } from '@/lib/material-ui'
import { useShoppingCartContext } from '@/context'

export const ShoppingCartButton: React.FC = () => {
  const { cartQuantity, onToggleDrawer } = useShoppingCartContext()
  return (
    <IconButton sx={{ ':hover': 'pointer' }} onClick={onToggleDrawer}>
      <Badge badgeContent={cartQuantity} color="error" max={99}>
        <ShoppingBagOutlinedIcon
          sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#ffffff' }}
        />
      </Badge>
    </IconButton>
  )
}
