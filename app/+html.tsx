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
        <meta name="color-scheme" content="light dark" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F6FA" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#05070B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="PowerLog" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        <script dangerouslySetInnerHTML={{ __html: initialColorSchemeScript }} />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: runtimeScripts }} />
      </body>
    </html>
  );
}

const responsiveBackground = `
html,
body {
  background-color: #F4F6FA;
  color-scheme: light dark;
}
html,
body,
#root {
  min-height: 100%;
}
#root {
  background-color: #F4F6FA;
}
html.powerlog-dark,
html.powerlog-dark body,
html.powerlog-dark #root {
  background-color: #05070B !important;
}
html.powerlog-dark [style*="background-color: rgb(244, 246, 250)"],
html.powerlog-dark [style*="background-color:#F4F6FA"],
html.powerlog-dark [style*="background-color: #F4F6FA"] {
  background-color: #05070B !important;
}
@media (prefers-color-scheme: dark) {
  html,
  body {
    background-color: #05070B;
  }
  #root {
    background-color: #05070B;
  }
}`;

const initialColorSchemeScript = `
(function() {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('powerlog-dark');
      document.documentElement.style.backgroundColor = '#05070B';
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch (error) {}
})();`;

const runtimeScripts = `
var colorSchemeQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
if (colorSchemeQuery) {
  var syncColorSchemeClass = function(event) {
    var isDark = event && typeof event.matches === 'boolean' ? event.matches : colorSchemeQuery.matches;
    document.documentElement.classList.toggle('powerlog-dark', isDark);
    document.documentElement.style.backgroundColor = isDark ? '#05070B' : '#F4F6FA';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  };
  syncColorSchemeClass();
  if (colorSchemeQuery.addEventListener) {
    colorSchemeQuery.addEventListener('change', syncColorSchemeClass);
  } else if (colorSchemeQuery.addListener) {
    colorSchemeQuery.addListener(syncColorSchemeClass);
  }
}

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
