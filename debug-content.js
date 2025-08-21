import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mnairnnovejrvgxzvktq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uYWlybm5vdmVqcnZneHp2a3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNzcyMTAsImV4cCI6MjA2NzY1MzIxMH0.8RcfqCugMAr9h_-BeFuWKzuTDconbcrCM7k4lbZdstg";

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugContent() {
  console.log("🔍 Debugging content...");

  // Test subjects
  const { data: subjects, error: subjectsError } = await supabase
    .from("subjects")
    .select("*");

  console.log("📚 Subjects:", subjects?.length || 0);
  if (subjectsError) console.error("Subjects error:", subjectsError);

  // Test lessons without filters
  const { data: allLessons, error: lessonsError } = await supabase.from(
    "lessons"
  ).select(`
      *,
      subject:subjects(*)
    `);

  console.log("📖 All lessons (no filters):", allLessons?.length || 0);
  if (lessonsError) console.error("Lessons error:", lessonsError);

  // Test lessons with is_active filter
  const { data: activeLessons, error: activeError } = await supabase
    .from("lessons")
    .select(
      `
      *,
      subject:subjects(*)
    `
    )
    .eq("is_active", true);

  console.log("✅ Active lessons:", activeLessons?.length || 0);
  if (activeError) console.error("Active lessons error:", activeError);

  if (allLessons && allLessons.length > 0) {
    console.log("Sample lesson:", {
      id: allLessons[0].id,
      title: allLessons[0].title,
      is_active: allLessons[0].is_active,
      subject: allLessons[0].subject?.name,
    });
  }
}

debugContent();
