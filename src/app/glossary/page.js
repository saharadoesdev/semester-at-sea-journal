import { createClient } from "@/utils/supabase/server";
import GlossaryDisplay from "@/components/glossary/GlossaryDisplay";

export default async function GlossaryPage() {
  const supabase = await createClient();
  const { data: terms, error } = await supabase
    .from("Glossary")
    .select()
    .order("term", { ascending: true });

  return <GlossaryDisplay terms={terms || []} />;
}
