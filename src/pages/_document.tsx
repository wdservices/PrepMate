import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Polyfill for Node.js core modules */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Polyfill for global objects
              window.global = window;
              window.Buffer = window.Buffer || require('buffer').Buffer;
              window.process = window.process || require('process/browser');
              
              // Polyfill for process.env
              window.process = window.process || {};
              window.process.env = window.process.env || {};
              
              // Add any other global polyfills here
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
