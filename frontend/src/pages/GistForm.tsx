import React from 'react'
import { useParams } from 'react-router-dom'

function GistForm() {
  const { id } = useParams();
  return (
    <div>{id ? 'Edit Gist' : 'Create Gist'}</div>
  )
}

export default GistForm