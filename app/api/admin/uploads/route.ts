import { NextRequest, NextResponse } from 'next/server';
import { ensureAdminRequest } from '../../../../lib/admin-route';
import { uploadImageToWebsiteBucket } from '../../../../lib/supabase-admin';

export async function POST(request: NextRequest) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const folder = String(formData.get('folder') || 'uploads').trim();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file.' }, { status: 400 });
    }

    const uploaded = await uploadImageToWebsiteBucket(file, folder || 'uploads');
    return NextResponse.json({ url: uploaded.publicUrl, path: uploaded.path });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 400 });
  }
}
