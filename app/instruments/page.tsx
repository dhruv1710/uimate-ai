import { createClient } from '@/lib/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: chat } = await supabase.from("chat_history").select();

  return <pre>{JSON.stringify(chat, null, 2)}</pre>
}