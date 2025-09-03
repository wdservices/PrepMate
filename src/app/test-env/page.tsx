'use client';

import { useEffect, useState } from 'react';

export default function TestEnvPage() {
  const [envVars, setEnvVars] = useState<Record<string, any>>({});

  useEffect(() => {
    // Client-side environment variables
    const clientVars = {
      NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      // Add any other environment variables you want to check
    };
    
    setEnvVars({
      ...clientVars,
      // Show all environment variables for debugging
      allVars: Object.keys(process.env)
        .filter(k => k.includes('GOOGLE') || k.includes('NEXT') || k.includes('NODE'))
        .reduce((acc, key) => ({
          ...acc,
          [key]: key.includes('KEY') ? '***' + (process.env[key]?.slice(-4) || '') : process.env[key]
        }), {})
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(envVars, null, 2)}
      </pre>
      
      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h2 className="font-bold text-lg mb-2">Troubleshooting Steps:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Ensure you have a <code>.env.local</code> file in your project root</li>
          <li>It should contain: <code>NEXT_PUBLIC_GOOGLE_API_KEY=your_key_here</code></li>
          <li>Restart your development server after making changes to <code>.env.local</code></li>
          <li>Check browser console for any error messages</li>
        </ol>
      </div>
    </div>
  );
}
