import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function safeExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext && /^[a-z0-9]+$/.test(ext) ? ext : 'bin';
}

export async function uploadImageToWebsiteBucket(file: File, folder: string) {
  const extension = safeExtension(file.name || 'file');
  const random = Math.random().toString(36).slice(2, 10);
  const path = `${folder}/${Date.now()}-${random}.${extension}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabaseAdmin.storage.from('website').upload(path, buffer, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'application/octet-stream',
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage.from('website').getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}
