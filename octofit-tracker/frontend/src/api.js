import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getCollectionUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

function toRecords(payload) {
  if (Array.isArray(payload)) return payload

  for (const key of ['results', 'data', 'items']) {
    if (Array.isArray(payload?.[key])) return payload[key]
  }

  return []
}

export function useApiCollection(resource) {
  const [state, setState] = useState({ records: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      try {
        const response = await fetch(getCollectionUrl(resource), { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        const payload = await response.json()
        setState({ records: toRecords(payload), loading: false, error: '' })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ records: [], loading: false, error: 'Unable to load this data right now.' })
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [resource])

  return state
}