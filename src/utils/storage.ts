export interface ProfileData {
  humanName: string
  humanAvatar: string
  aiName: string
  aiAvatar: string
}

const STORAGE_KEY = 'sa_profile'

const defaultProfile: ProfileData = {
  humanName: '颜颜',
  humanAvatar: '',
  aiName: '溯',
  aiAvatar: '',
}

export function getProfile(): ProfileData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) }
  } catch {}
  return defaultProfile
}

export function saveProfile(data: Partial<ProfileData>) {
  const current = getProfile()
  const updated = { ...current, ...data }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
