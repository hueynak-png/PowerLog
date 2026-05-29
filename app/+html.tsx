import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Note: For full i18n, the lang attribute should be set dynamically based on user preference.
          This static file runs at build time. The app uses expo-localization for runtime detection. */}
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F6FA" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#05070B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PowerLog" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: registerSW }} />
      </body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #F4F6FA;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #05070B;
  }
}`;

const registerSW = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      registration.addEventListener('updatefound', function() {
        var worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', function() {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            window.dispatchEvent(new Event('powerlog:update-available'));
          }
        });
      });
    }).catch(function() {});
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      window.dispatchEvent(new Event('powerlog:update-available'));
    });
  });
}`;
