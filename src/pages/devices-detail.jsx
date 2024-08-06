import React from 'react'
import { Helmet } from 'react-helmet-async'
import { DevicesDetailView } from 'src/sections/devices-detail/view'

export default function DevicesDetailPage  ()  {
  return (
    <div>
      <Helmet>
        <title> Qurilma tavsilotlari | Minimal UI </title>
      </Helmet>
      <DevicesDetailView />
    </div>
  )
}

