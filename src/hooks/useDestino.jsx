import React, { useContext } from 'react'
import DestinoContext from '../context/DestinoProvider'

export default function useDestino() {
  return useContext(DestinoContext)
}
