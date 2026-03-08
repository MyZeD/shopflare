# Shopflare

Shopflare ist ein statischer E‑Commerce‑Prototyp und eine praxisnahe Referenz für moderne Frontend- und Jamstack-Architekturen. Der Quellcode ist öffentlich auf GitHub verfügbar (Link im Footer).

Ziel dieses Projekts ist es, eine klar strukturierte, performante und erweiterbare Grundlage für Shop‑Frontends zu demonstrieren.

## Projektziel

Dieses Repository zeigt, wie ein statisch generiertes Shop-Frontend sauber umgesetzt werden kann:

- kategorisierte Produktübersichten
- Detailseiten pro Artikel
- Warenkorb-Seite als Einstieg in den Checkout-Flow
- rechtliche Seiten (Impressum, Datenschutz)
- wiederverwendbare Layouts und klare Datenstruktur

## Tech-Stack

- **Eleventy (11ty)** für Static Site Generation
- **Alpine.js** für leichtes Interaktivitäts-Handling
- **Bulma CSS** für UI-Basis und schnelle Komponentenstruktur

## Features (aktuell)

- Startseite mit Produktdarstellung
- Kategorieseiten mit Slug-basiertem Routing
- Produktdetailseiten aus zentraler Datenquelle
- Warenkorb-Ansicht als eigene Route
- Rechtstexte mit separatem Legal-Layout
- Build-Ausgabe in `_site/`

## Architektur & Struktur

- Datenhaltung über `src/_data/` (Produkte, Kategorien, Slugs)
- Seiten-Templates in `src/*.njk`
- Wiederverwendbare Layouts in `src/_includes/layouts/`
- Assets zentral unter `src/assets/`

Das Projekt ist bewusst so aufgebaut, dass eine spätere Umstellung von statischen JSON-Daten auf externe Datenquellen unkompliziert möglich ist.


## Technischer Fokus

Dieses Projekt demonstriert insbesondere:

- saubere Template-Architektur mit 11ty
- strukturierte Datenmodellierung für Content-getriebene Seiten
- konsistente URL-Strategie (Kategorie- und Produkt-Slugs)
- Trennung von Daten, Darstellung und Layout-Logik
- pragmatische UI-Umsetzung mit leichtgewichtiger Interaktivität

## Geplante Ausbaustufen

Empfohlene nächste Schritte für eine produktionsnähere Version:

1. **Cloudflare D1 Integration** statt lokaler Produkt-JSON
2. **Suche & Filter** (Volltext, Preis, Sortierung)
3. **Persistenter Warenkorb** (LocalStorage + optional Server-Sync)
4. **Checkout-Anbindung** (z. B. Stripe)
5. **Bestands- und Verfügbarkeitslogik**
6. **SEO-Upgrade** (JSON-LD, OpenGraph, Meta-Optimierung)
7. **Internationalisierung** (DE/EN)
8. **Testing & QA** (Lighthouse, E2E, CI)

## Lokal starten

```bash
pnpm install
pnpm exec eleventy --serve
```

Anschließend ist das Projekt lokal mit Live-Reload verfügbar.

## Open Source & Lizenz

Dieses Projekt ist Open Source und steht unter der MIT-Lizenz. Der Code darf gemäß MIT-Lizenz verwendet, adaptiert und weiterverbreitet werden. Die vollständige Lizenz finden Sie in [LICENSE](./LICENSE).

Kontakt: Bei Interesse an Anpassungen, Integrationen oder Zusammenarbeit kontaktieren Sie mich gern (Kontaktinformationen im Impressum).
