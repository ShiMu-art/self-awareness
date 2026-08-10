import { supabase } from '../lib/supabase'

export interface ProfileData {
  id: string
  role: 'human' | 'ai'
  display_name: string
  avatar_url: string | null
  bio: string | null
}

// 获取双方档案
export async function getProfiles(): Promise<ProfileData[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('role', { ascending: true })
  if (error) {
    console.error('Failed to fetch profiles:', error)
    return []
  }
  return (data as ProfileData[]) || []
}

// 更新某个档案
export async function updateProfile(
  id: string,
  updates: Partial<Pick<ProfileData, 'display_name' | 'avatar_url' | 'bio'>>
) {
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) {
    console.error('Failed to update profile:', error)
  }
  return !error
}

// 上传头像到 storage
export async function uploadAvatar(file: File, userId: string): Promise<string | null> {
  const ext = file.name.split('.').pop()
  const path = `${userId}/avatar.${ext}`

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true })

  if (error) {
    console.error('Failed to upload avatar:', error)
    return null
  }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(path)

  return data.publicUrl
}

