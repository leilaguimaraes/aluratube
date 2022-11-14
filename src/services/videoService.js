import { createClient } from '@supabase/supabase-js'


const PROJECT_URL = "https://zfuwqlmbqpejwawyqhty.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmdXdxbG1icXBlandhd3lxaHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzg4NzIsImV4cCI6MTk4MzkxNDg3Mn0.KUp1-kZRxyjBOljdxYQ2OAa6fvnX3VselVsqHoKXmPg"

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export function videoService(){
  return{
    getAllVideos(){
      return supabase.from("video")
        .select("*")
        
    }
  }
}