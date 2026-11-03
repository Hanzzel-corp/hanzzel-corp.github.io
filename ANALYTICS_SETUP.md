# Hanzzel Corp — Analytics setup

This repository contains a small shared Umami loader for the public GitHub Pages sites.

## Sites to create in Umami

Create three separate websites in the Umami dashboard, all using the hostname `hanzzel-corp.github.io`:

1. Portfolio — `https://hanzzel-corp.github.io/`
2. Store — `https://hanzzel-corp.github.io/hanzzel-store/`
3. Knowledge Map — `https://hanzzel-corp.github.io/knowledge-map/`

Copy each Website ID into `analytics-config.js`:

- `websites.portfolio`
- `websites.store`
- `websites.knowledgeMap`

The tracker intentionally stays inactive while an ID is blank or invalid. No fabricated IDs or tracking requests are sent before configuration.

## Events prepared

- Portfolio: AI/automation contact, GitHub, LinkedIn and Store clicks.
- Store: book request clicks (added on the product request links).
- Knowledge Map: research directory, machine-readable index, sitemap and selected project links.

Umami automatically collects pageviews and referrers once the valid ID is configured. Custom events use `data-umami-event` attributes.

## Privacy and interpretation

- Do not send names, email addresses, payment information or other personal data as event properties.
- Do Not Track is respected by the tracker configuration.
- Referrer data only identifies an AI platform when the browser actually sends a recognizable referrer. It cannot reliably detect every AI-assisted discovery.
- Crawler visits and human visits must not be conflated. Umami browser tracking is not a crawler-log analyzer.
- Use Google Search Console separately for search impressions and clicks.
- The Umami dashboard is private; do not publish visitor counts as public counters without a deliberate decision.

Official docs: https://docs.umami.is/docs and https://docs.umami.is/docs/tracker-configuration
