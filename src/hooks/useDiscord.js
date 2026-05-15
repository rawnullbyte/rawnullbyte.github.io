import { useState, useEffect } from 'react'

const USER_ID = '143034815753486336'
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${USER_ID}`

const STATUS_IMAGES = {
  online: '/img/online.png',
  idle: '/img/idle.png',
  dnd: '/img/dnd.png',
  offline: '/img/offline.png',
}

const FALLBACK = {
  displayName: 'NullByte',
  username: '𝘐 𝘸𝘢𝘯𝘵 𝘵𝘰 𝘣𝘦 𝘥𝘦𝘢𝘥',
  avatarUrl: '',
  statusImg: STATUS_IMAGES.offline,
}

export function useDiscord() {
  const [discord, setDiscord] = useState(FALLBACK)

  async function fetchStatus() {
    try {
      const res = await fetch(LANYARD_URL)
      if (!res.ok) throw new Error('bad response')
      const { data, success } = await res.json()
      if (!success) throw new Error('api error')

      const { discord_user, discord_status, kv } = data
      const avatarUrl = discord_user?.avatar
        ? `https://cdn.discordapp.com/avatars/${USER_ID}/${discord_user.avatar}.png?size=256&t=${Date.now()}`
        : ''

      setDiscord({
        displayName: discord_user?.display_name ?? FALLBACK.displayName,
        username: kv?.bio ?? discord_user?.username ?? FALLBACK.username,
        avatarUrl,
        statusImg: STATUS_IMAGES[discord_status] ?? STATUS_IMAGES.offline,
      })
    } catch {
      setDiscord(prev => ({ ...prev, statusImg: STATUS_IMAGES.offline }))
    }
  }

  useEffect(() => {
    fetchStatus()
    const id = setInterval(fetchStatus, 60_000)
    return () => clearInterval(id)
  }, [])

  return discord
}
