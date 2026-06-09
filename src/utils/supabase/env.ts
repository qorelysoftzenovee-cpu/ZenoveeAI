const SUPABASE_URL_ENV = "NEXT_PUBLIC_SUPABASE_URL" as const;
const SUPABASE_ANON_KEY_ENV = "NEXT_PUBLIC_SUPABASE_ANON_KEY" as const;

function getEnvOrThrow(name: typeof SUPABASE_URL_ENV | typeof SUPABASE_ANON_KEY_ENV) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    );
  }

  return value;
}

const supabaseUrl = getEnvOrThrow(SUPABASE_URL_ENV);
const supabaseAnonKey = getEnvOrThrow(SUPABASE_ANON_KEY_ENV);

export { supabaseAnonKey, supabaseUrl };
