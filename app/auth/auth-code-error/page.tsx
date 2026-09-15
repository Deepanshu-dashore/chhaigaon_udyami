import React from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface text-on-surface p-4">
      <div className="max-w-md w-full bg-surface-container-lowest border border-error/30 rounded-lg p-6 shadow-sm text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-700">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-sans text-on-surface">
          Authentication Error
        </h1>
        <p className="text-sm font-serif text-on-surface-variant">
          We could not verify your login request or the authorization code has expired.
        </p>
        <p className="text-xs font-label text-outline">
          Please try signing in again. If the issue persists, ensure your browser allows cookies.
        </p>
        <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium font-label bg-primary hover:bg-primary-container text-on-primary rounded-md transition shadow-sm"
          >
            Back to Login
          </Link>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium font-label bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-md transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
