/**
 * API and OAuth 2.1 Configuration
 * Base URLs and third-party integration endpoints.
 */

const SUPABASE_BASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yfkldwhzyumlsdgnwymn.supabase.co";

const SUPABASE_AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL || `${SUPABASE_BASE_URL}/auth/v1`;

const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const API_CONFIG = {
  baseUrl: APP_BASE_URL,
  supabase: {
    url: SUPABASE_BASE_URL,
    authUrl: SUPABASE_AUTH_BASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
  /**
   * OAuth 2.1 Endpoints
   * Share these endpoints with third-party applications that need to integrate with your OAuth 2.1 server.
   */
  oauth: {
    /** Authorization endpoint */
    authorizationEndpoint: `${SUPABASE_AUTH_BASE_URL}/oauth/authorize`,
    /** Token endpoint */
    tokenEndpoint: `${SUPABASE_AUTH_BASE_URL}/oauth/token`,
    /** JWKS (JSON Web Key Set) endpoint */
    jwksEndpoint: `${SUPABASE_AUTH_BASE_URL}/.well-known/jwks.json`,
    /** OIDC (OpenID Connect) discovery endpoint */
    oidcDiscoveryEndpoint: `${SUPABASE_AUTH_BASE_URL}/.well-known/openid-configuration`,
  },
  routes: {
    auth: {
      login: "/api/auth/login",
      register: "/api/auth/register",
      logout: "/api/auth/logout",
      me: "/api/auth/me",
      otp: "/api/auth/otp",
    },
    courses: "/api/courses",
    schemes: "/api/schemes",
    startupResources: "/api/startup-resources",
    marketLinkages: "/api/market-linkages",
    payments: {
      createOrder: "/api/payments/create-order",
      verify: "/api/payments/verify",
    },
    certificates: "/api/certificates",
  },
} as const;

export default API_CONFIG;
