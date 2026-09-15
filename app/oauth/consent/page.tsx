// app/oauth/consent/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, XCircle, Key } from 'lucide-react'

export default async function ConsentPage({
  searchParams,
}: {
  searchParams: Promise<{ authorization_id?: string }>
}) {
  const { authorization_id: authorizationId } = await searchParams

  if (!authorizationId) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface p-4 text-on-surface">
        <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-sans text-on-surface">Missing Authorization ID</h1>
          <p className="text-sm font-serif text-on-surface-variant">
            This consent page was accessed directly without an active OAuth authorization request.
          </p>
          <p className="text-xs font-label text-outline">
            To authorize an app, initiate the OAuth flow from the requesting application with a valid <code>authorization_id</code> query parameter.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block px-4 py-2 text-sm font-medium font-label bg-primary hover:bg-primary-container text-on-primary rounded-md transition shadow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseKey,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: async (cookiesToSet) => {
          const cookieStore = await cookies()
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  // Check if user is authenticated
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (!claims) {
    // Redirect to login, preserving authorization_id
    redirect(`/login?redirect=/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`)
  }

  // Get authorization details using the authorization_id
  const { data: authDetails, error } =
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId)

  if (error || !authDetails) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface p-4 text-on-surface">
        <div className="max-w-md w-full bg-surface-container-lowest border border-error/30 rounded-lg p-6 shadow-sm text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-700">
            <XCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-sans text-on-surface">Authorization Error</h1>
          <p className="text-sm font-serif text-error">
            {error?.message || 'Invalid authorization request'}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block px-4 py-2 text-sm font-medium font-label bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-md transition"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // If no authorization_id returned, user has previously consented, redirect them
  if (!('authorization_id' in authDetails)) {
    redirect(authDetails['redirect_url'])
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface p-4 text-on-surface">
      <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-1">
            <Key className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-sans text-on-surface">
            Authorize {authDetails.client.name}
          </h1>
          <p className="text-sm font-serif text-on-surface-variant">
            This application is requesting access to your Chhaigaon Udyami account.
          </p>
        </div>

        <div className="bg-surface-container-low rounded-md p-4 space-y-3 border border-outline-variant/60 text-sm">
          <div>
            <span className="text-outline block text-xs uppercase tracking-wider font-semibold font-label">Client Name</span>
            <span className="text-on-surface font-medium font-sans">{authDetails.client.name}</span>
          </div>
          <div>
            <span className="text-outline block text-xs uppercase tracking-wider font-semibold font-label">Redirect URI</span>
            <span className="text-on-surface-variant font-mono text-xs break-all">{authDetails.redirect_uri}</span>
          </div>
          {authDetails.scope && authDetails.scope.trim() && (
            <div>
              <span className="text-outline block text-xs uppercase tracking-wider font-semibold font-label mb-1.5">Requested Permissions</span>
              <ul className="space-y-1 text-xs">
                {authDetails.scope.split(' ').map((scopeItem) => (
                  <li key={scopeItem} className="font-mono bg-surface-container-high text-on-surface px-2.5 py-1 rounded inline-block mr-1.5 mb-1 border border-outline-variant/40">
                    {scopeItem}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form action="/api/oauth/decision" method="POST" className="grid grid-cols-2 gap-3 pt-2">
          <input type="hidden" name="authorization_id" value={authorizationId} />
          <button
            type="submit"
            name="decision"
            value="deny"
            className="w-full px-4 py-2.5 text-sm font-semibold font-label rounded-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition border border-outline-variant"
          >
            Deny
          </button>
          <button
            type="submit"
            name="decision"
            value="approve"
            className="w-full px-4 py-2.5 text-sm font-semibold font-label rounded-md bg-primary hover:bg-primary-container text-on-primary shadow-sm transition"
          >
            Approve
          </button>
        </form>
      </div>
    </main>
  )
}