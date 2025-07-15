// Simple test to verify Supabase database connection
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mnairnnovejrvgxzvktq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uYWlybm5vdmVqcnZneHp2a3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNzcyMTAsImV4cCI6MjA2NzY1MzIxMH0.8RcfqCugMAr9h_-BeFuWKzuTDconbcrCM7k4lbZdstg";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");

    // Test 1: Get subjects
    const { data: subjects, error: subjectsError } = await supabase
      .from("subjects")
      .select("*")
      .limit(5);

    if (subjectsError) {
      console.error("Error fetching subjects:", subjectsError);
      return;
    }

    console.log("✅ Successfully connected to Supabase!");
    console.log("📚 Subjects found:", subjects?.length || 0);
    if (subjects && subjects.length > 0) {
      console.log("First subject:", subjects[0]);
    }

    // Test 2: Get lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .limit(3);

    if (lessonsError) {
      console.error("Error fetching lessons:", lessonsError);
      return;
    }

    console.log("📖 Lessons found:", lessons?.length || 0);
    if (lessons && lessons.length > 0) {
      console.log("First lesson:", lessons[0]);
    }
  } catch (error) {
    console.error("❌ Connection test failed:", error);
  }
}

testConnection();
