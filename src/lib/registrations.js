import { supabase } from './supabase';

export async function uploadReceipt(file, baseName) {
  if (!file) throw new Error('No file provided');
  const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase();
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(ext) ? ext : 'jpg';
  const folder = baseName || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const path = `${folder}/${Date.now()}.${safeExt}`;

  const { data, error } = await supabase.storage
    .from('receipts')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  return String(data.path || '').trim().replace(/^\/+/, '');
}

export async function createRegistration(payload) {
  const { data, error } = await supabase.from('registrations').insert(payload).select().single();

  if (error) throw error;
  return data;
}
