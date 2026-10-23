# Migration map review

8 decisions reviewed. Live reachability is unchecked. Query changes require human review.

## Review items

- https://example.com/team: 2 redirect hops; prefer a direct reviewed destination
- https://example.com/about: Redirect loop detected
- https://example.com/about-old: Redirect loop detected
- https://example.com/downloads: Supplied status export marks the destination as missing
- https://example.com/search?q=parts: Redirect loop detected

- https://example.com/services-old → https://example.com/capabilities (301)
- https://example.com/team → https://example.com/people-old (301)
- https://example.com/people-old → https://example.com/people (301)
- https://example.com/about → https://example.com/about-old (301)
- https://example.com/about-old → https://example.com/about (301)
- https://example.com/downloads → https://example.com/documents (301)
- https://example.com/search?q=parts → https://example.com/search?q=parts (301)
- https://example.com/retired → Retired (410)