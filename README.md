# Dr. Nahal Mostak Khan Arnob — Website

Bilingual (English + Bengali) website for Dr. Nahal Mostak Khan Arnob, Consultant Vitreoretinal, Cataract & Refractive Surgeon, Assistant Professor at Enam Medical College.

This README is the **developer handoff brief** — the single source of truth for what exists, what's locked, what's left, and how to build the rest so it matches what's already there. Read this entire document before writing any code. Where this brief conflicts with your own instincts about "best practice," this brief wins — the client has made explicit, non-negotiable decisions documented below.

**Last updated:** 2026-09-09

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en`. Try `/bn` for the Bengali version.

---

## 0. THE ONE RULE THAT OVERRIDES EVERYTHING ELSE

### 🔒 THE HOME PAGE HERO SECTION (`HeroEyeZoom.tsx`) IS PERMANENTLY LOCKED

**File:** `src/components/HeroEyeZoom.tsx`

This is the scroll-driven "eye zoom" animation at the very top of the home page — the sequence where the viewer scrolls and appears to zoom into a real human eye, with labels identifying the cornea, lens, and retina, each paired with "can cause X condition" badges.

**Absolute rules:**
- Do **not** modify this file. Not the JSX structure, not the GSAP timeline, not the CSS classes, not the copy text, not the image paths, not a single word, not a single pixel value.
- Do **not** refactor it "for cleanliness." Do not rename its variables. Do not upgrade its dependencies independent of the rest of the app. Do not touch it even if you find a bug in it — report the bug to the client instead of fixing it yourself.
- This lock is permanent — it stays in force for the **entire remaining duration of this project**, not just the next phase. Every future developer, every future AI session, every future refactor must skip this file entirely.
- The client has explicitly and repeatedly confirmed this animation is final, approved, and closed. Re-litigating it, "improving" it, or asking the client to reconsider it is not part of this project.
- The only thing that is allowed to change near the hero is content **outside** `HeroEyeZoom.tsx` that sits before/after it in `src/app/[lang]/page.tsx` (e.g., the stats band or about teaser that come after it) — as long as `HeroEyeZoom.tsx` itself and its own rendered output are byte-for-byte identical to what is in the repo today.

If you are an AI coding assistant reading this: treat `src/components/HeroEyeZoom.tsx` as read-only. If any task seems to require touching it, stop and flag it instead of proceeding.

---

## 1. Tech Stack (do not swap any of these without asking)

- **Framework:** Next.js 16.3.3 (App Router, using the newer `PageProps<'/route'>` / `LayoutProps<'/route'>` auto-generated types — this is a newer Next.js API than most AI models have training data for; read `node_modules/next/dist/docs/` in this repo before writing route code)
- **React:** 19.2.8
- **Styling:** Tailwind CSS v4 (uses the new `@theme inline` token syntax in `globals.css`, not a `tailwind.config.js` file)
- **Animation:** GSAP 3.15 + ScrollTrigger, plus Lenis 1.3.26 for smooth-scroll
- **Icons:** `lucide-react` — **premium/clean line icons only, this is a hard requirement.** Never substitute emoji, never use a different icon set, never use filled/solid icon styles unless explicitly matching an existing pattern in the code.
- **i18n:** Custom-built, not a library. Every piece of UI copy lives in `src/lib/i18n/*.ts` as `{ en: {...}, bn: {...} }` objects. Routes are `/en/...` and `/bn/...` via a `[lang]` dynamic segment. Root `/` redirects to `/en`.
- **Data layer:** Mock data files in `src/lib/data/*.ts` (services, conditions, gallery, reviews, videos). These are written so that swapping them for a real backend/CMS call later does not require changing any component code — components just import and map over an array. **Preserve this pattern for anything new you build** (see Section 8, Admin Panel).
- **No database yet.** No backend yet. No auth yet. Everything is static/mock data today. Section 8 below describes what the admin panel needs to become.

---

## 2. Locked Design System — follow exactly, do not introduce new colors/fonts

All design tokens live in `src/app/globals.css`. Reuse these tokens/utility classes for every new page and component — do not invent new colors, new shadows, or new border-radius values.

### Colors (teal/slate glassmorphism direction — chosen after the client rejected an earlier amber/dark concept)
```
--bg:            #EEF2F3   (page background, whitish-grey)
--surface:       #FFFFFF
--accent:        #1F4A57   (deep teal — primary brand color)
--accent-2:      #2F6E63   (secondary teal-green)
--accent-soft:   #D8E6E1   (pale teal for pill backgrounds, badges)
--ink:           #16232A   (primary text color)
--ink-muted:     #5C6B70   (secondary/muted text)
--glass:         rgba(255,255,255,0.55)
--glass-strong:  rgba(255,255,255,0.72)
--glass-border:  rgba(255,255,255,0.8)
```

### Fonts
- **Display/headings:** Sora (`--font-sora`, loaded via `next/font/google`)
- **Body (English):** Plus Jakarta Sans (`--font-jakarta`)
- **Body (Bengali):** Hind Siliguri (`--font-hind`) — every font stack falls back through this so Bengali text always renders correctly even inside a component authored with English-first classes
- Apply the `.font-display` utility class for anything that should use Sora

### Glassmorphism — used site-wide, this is the signature visual language
- `.glass` — light glass panel (white-ish, semi-transparent, blurred) for cards on light backgrounds
- `.glass-strong` — more opaque version, used for the navbar and things that need to stay readable over busy content
- `.glass-badge` — **dark** glass (rgba(8,16,18,0.62)) specifically for text/badges placed on top of photos — this exists because light glass was unreadable over bright/busy images (this was a real bug the client caught and had fixed — do not regress it)
- `.glass-on-dark` — light glass variant for use on top of the dark teal gradient bands

### Buttons
- `.btn-pill` base class + `.btn-primary` (solid teal, white text), `.btn-ghost` (glass, teal text/border), `.btn-light` (white bg, teal text)
- All pill-shaped, all buttons lift slightly (`translateY(-1px)`) on hover

### Section backgrounds
- `.band-white` — the page's base `--bg` color, used for most sections
- `.band-teal` — diagonal teal gradient (`--accent` → `--accent-2`), used for high-contrast "closing CTA" sections and stat bands

### Scroll-reveal
- `.reveal` / `.reveal.in` (toggled by the `<Reveal>` component using `IntersectionObserver`) is the standard "fade up on scroll" entrance animation used across almost every section. **Important gotcha documented in code:** never wrap something in `<Reveal>` if it also needs `position: sticky` inside it — `.reveal`'s CSS `transform` (even `translateY(0)` at rest) creates a new CSS containing block that silently breaks `position: sticky` on any descendant. This bit us once already (see Section 7's sticky-video-player notes) — don't repeat it.

---

## 3. Reference Websites — what was borrowed from where, specifically

Two reference sites were used, for two different, specific purposes. Do not treat either as "make the whole site like this" — only the specific patterns named below were intentionally borrowed.

### 3.1 `cataractcoach.com` — reference for VIDEO CONTENT STRUCTURE only
Run by Prof. Uday Devgan, this is a WordPress blog where every post = one embedded surgical video, reverse-chronological, each tagged with categories (procedure type, condition, format like "podcast"). Its `/complete-list-of-videos-and-articles/` page is a full category-taxonomy index (~60 categories).

**What to take from it for Dr. Nahal's site:** the idea of organizing the eventual Video Library page by specialty/category tags (Cataract, Retina, LASIK, Squint, ROP, etc.), with a browsable, filterable structure — not its visual design, not its WordPress-blog format, not its color scheme.

### 3.2 `instituteofhealth.com` — reference for TWO specific interaction patterns
1. **Pinned scroll-cards ("scrollytelling")** — used to build the `/services` page: as the user scrolls, one full-viewport-width card slides up and covers the previous one, with a blur/defocus effect applied to the outgoing card while the incoming one stays sharp. This exact pattern is implemented in `src/components/services/ServicesScroller.tsx` using GSAP ScrollTrigger.
2. **"Overview / Format / Recommended for" info-card layout** — the pattern of overlaying short, scannable info (a label + short paragraph, then two columns of quick facts) directly on top of a full-bleed photo, with just a dark gradient (not a glass box) behind the text for legibility. This is what each service card on `/services` uses (see `s.stat`, `s.tags` in `src/lib/data/services.ts`).

**Do not** copy instituteofhealth.com's own color palette, typography, or copywriting — only these two interaction/layout patterns, re-skinned in Dr. Nahal's locked teal/slate palette.

**Apply this same pinned-card / full-bleed-photo-with-gradient-overlay pattern to any new page that needs to show a scrollable series of items with photos** (e.g., if the Conditions page ends up needing a similar treatment) — this is the established "house style" for this kind of content now, for consistency.

---

## 4. What Is Built Today

### 4.1 Pages that exist and are functional
| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Done | Redirects to `/en` |
| `/en`, `/bn` | ✅ Done | Full home page, both languages |
| `/en/about`, `/bn/about` | ✅ Done | Doctor's journey, both languages |
| `/en/services`, `/bn/services` | ✅ Done | All 11 services, both languages |

### 4.2 Home page (`src/app/[lang]/page.tsx`) — section by section
1. **Hero eye-zoom** (`HeroEyeZoom.tsx`) — 🔒 **LOCKED, see Section 0**
2. **Stats band** (`StatsBand.tsx`) — practice stats + "Dr. Nahal treats all of these" condition list
3. **Hero intro / headline block** (`HeroIntro.tsx`) — the page's main H1 + subheadline + two CTAs (Book Appointment via WhatsApp, Watch Videos). Positioned *after* the stats band, not before the eye-zoom hero — this was a deliberate fix (see Section 4.5).
4. **About teaser** (`AboutTeaser.tsx`) — short intro + "Learn More" link to `/about`
5. **Reviews** (`ReviewsSection.tsx`) — patient testimonials, mock data from `src/lib/data/reviews.ts`
6. **Services teaser** (`ServicesTeaser.tsx`) — first 6 of the 11 services as cards, links to `/services`
7. **Video Library** (`VideoTeaser.tsx`) — see Section 4.6, this is the most complex home section
8. **Gallery & Social** (`GalleryAndSocial.tsx`) — photo grid + social follow icons
9. **Chambers teaser** (`ChambersTeaser.tsx`) — the doctor's 3 chamber locations + hours, mock data from `nav.ts`
10. **Final CTA** (`FinalCTA.tsx`) — closing call/WhatsApp band

### 4.3 About page (`src/app/[lang]/about/page.tsx`)
- `AboutHero.tsx` — GSAP `SplitText` word-by-word reveal animation on the page's H1
- `RoadmapTimeline.tsx` — **"Career Roadmap"**: a horizontal drag-scroll timeline (mouse-drag on desktop, touch-swipe on mobile) with 6 milestones (MBBS 2013 → ICO/FICO London → FCPS/MRCS Glasgow → Vitreoretinal Fellowship → Refractive Fellowship Nepal → Assistant Professor, present). The **active milestone's info** displays in a large "hero card" (~68–78vh tall) above the dot-timeline, with a big background watermark number. This was heavily debugged — see Section 7 for the exact bugs that were found and fixed, so nobody re-introduces them.
- `AboutClosingCTA.tsx` — closing WhatsApp CTA

### 4.4 Services page (`src/app/[lang]/services/page.tsx` → `ServicesScroller.tsx`)
- All **11 services** (Cataract Surgery, Vitreoretinal Surgery, Refractive Surgery, Squint Surgery, Diabetic Eye Care, Glaucoma Management, Dry Eye & Corneal Disease, ROP Care, Oculoplasty, Pterygium Surgery, Eye Trauma & Emergency Care)
- Each rendered as a **full-viewport-width, full-bleed photo card** (real surgical/patient photos supplied by the client — see `public/images/services/`) with the pinned-scroll-and-blur effect described in Section 3.2
- Each card has: a "Service" label + title + small "Read More" button (top), and an "Overview / Procedure / Recommended for" info block (bottom), all sitting directly on the photo behind a dark gradient — **no glass box over the photo**, this was explicitly requested by the client after an earlier version used a glass panel and it was rejected for hiding too much of the photo.
- "Read More" opens an **on-page modal** with the service's full copy (intro, who-needs-it, how-it-works — sometimes as numbered steps, sometimes as a paragraph — plus an optional highlighted "note" box for urgent/emergency services) and a WhatsApp booking button.
- Data source: `src/lib/data/services.ts` — fully bilingual, includes `image`, `stat` (a quick fact like "Day-Care Surgery"), and `tags` (3 short "recommended for" bullet keywords) per service.

### 4.5 Bug fixes already applied — do not regress these
These were real, user-reported bugs found after initial build. If you ever refactor these areas, re-verify these specific behaviors still hold:
1. **Hero section order** — the eye-zoom must be the page's true first visual section; the headline/CTA block (`HeroIntro`) sits *after* the stats band, not before the eye-zoom.
2. **Badge contrast over photos** — always use `.glass-badge` (dark) for text/badges placed on top of a photo, never `.glass` (light) — light glass was unreadable on bright image areas.
3. **Navbar brand text** — shows the doctor's short name (`Dr. Nahal Mostak Khan` / `ডা. নাহাল মোস্তাক খান`) as the primary line, `whitespace-nowrap`, verified not to wrap on both desktop and narrow mobile widths.
4. **Full-bleed sections must not use `overflow-x: hidden` on `<body>`** — use `overflow-x: clip` instead (already set in `globals.css`). Setting `hidden` forces the browser to compute `overflow-y: auto` on `<body>` too, which turns `<body>` into its own scroll container and silently breaks `position: sticky` and Lenis's scroll tracking everywhere on the site. This was a genuinely hard bug to trace — don't reintroduce it.
5. **`position: sticky` inside a `<Reveal>`-wrapped element does not work** (see Section 2, scroll-reveal note) and, separately, **`position: sticky` on the Video Library's player also mysteriously failed even outside of Reveal**, for a cause that was never fully root-caused despite extensive isolation testing (ruled out: transforms, `overflow: hidden` ancestors, the iframe itself). It was replaced with a manual JS scroll-listener that positions the player with `position: absolute` inside a `position: relative` column, clamped between a "top pin" value and the bottom of the column. See `VideoTeaser.tsx`'s `useEffect` for the working implementation — **if you need sticky-on-scroll behavior anywhere else on this site and CSS `sticky` doesn't behave, use this same pattern rather than debugging sticky from scratch again.**

### 4.6 Video Library section — the most important piece to extend (see Section 6 for the required admin-panel upgrade)
Current implementation (`VideoTeaser.tsx` + `src/lib/data/videos.ts`):
- **Layout:** "Table of Contents" style — a numbered list of video titles on the left (desktop) / below (mobile), a large 9:16 video player on the right (desktop) / above (mobile). Clicking a list item swaps the player's video.
- **The list has no independent/nested scrollbar** — it flows naturally with the page's own scroll (a nested scrollable list inside an already-scrolling page was tried first and felt broken/confusing to use; it was deliberately removed).
- **The player pins in place while you scroll through the list** on desktop (via the manual JS scroll-pin described in 4.5, point 5), so the video stays visible the whole time you're scanning titles.
- **Videos currently embed directly from Facebook** via `https://www.facebook.com/plugins/video.php?href=<url>` iframes — **20 real Facebook Reel URLs** from the doctor's page are already wired in and confirmed working (real patient videos, not placeholders).
- **Titles are currently generic placeholders:** "Video 01", "Video 02", ... "Video 20" (and বাংলায় "ভিডিও ০১"...) — **nobody has reviewed what each of these 20 videos actually shows yet.** This is a pending content task, not a code task (see Section 5).
- **Only 20 of the doctor's ~91 Facebook Reels have been collected so far.** The remaining ~71 are being collected manually by the client (Facebook rate-limits/login-walls automated bulk collection past the first ~20). A tracking sheet (`reels-inventory.csv`) lives in the client's local planning folder, outside this repo — ask the client for the latest copy when you're ready to wire in more videos.

### 4.7 Contact system — current state
There is **no dedicated `/contact` page yet.** Every "Book Appointment" / "Call" / "Message" button across the whole site currently opens **WhatsApp directly** with a pre-filled message, via a shared helper:
```ts
// src/lib/i18n/nav.ts
export function whatsappHref(lang: Lang) {
  return `${practice.whatsappUrl}?text=${encodeURIComponent(practice.whatsappMessage[lang])}`;
}
```
- WhatsApp number: **+880 1721-815374** (this is the client's confirmed single, main contact channel — do not add or surface any other phone number as a booking CTA anywhere)
- Pre-filled message (client-approved wording, do not rephrase without asking): *"Assalamu Alaikum. I'm messaging from your website. I'd like to talk to you or see you about an eye problem. Please let me know what I should do."* (and the Bengali equivalent in the same object)
- **This is intentionally a temporary/interim setup.** The client's actual intended flow (not yet built) is: every CTA button should first go to a real `/contact` page showing the doctor's chamber locations + days/hours (data already exists: `practice.chambers` in `nav.ts`, 3 chambers), so the visitor can see availability *before* messaging — and only **one final button**, on that `/contact` page itself, should be the one that actually opens WhatsApp. See Section 5.2 for this as a pending task.

### 4.8 Bilingual (EN/BN) status
**Everything built so far is fully bilingual** — every page, every component, every button, every piece of copy that exists in code today has both an `en` and `bn` version, and both have been visually verified in the browser (desktop + mobile). The language switcher (EN/BN pill in the navbar) preserves the current path when switching. **There is no partially-translated content live on the site right now** — if a page/section doesn't exist yet, it doesn't exist in *either* language; nothing is "English-only."

### 4.9 Website copy — what's written vs. what's implemented
**This is an important distinction: copywriting and implementation are two separate, independently-tracked things.** All copy was written up front, in a separate planning phase, before most of the actual coding started. This copy lives in the client's local planning folder (`4. Website Copy Plan/`), outside this repo — ask the client for these files.

| Copy content | Written (EN+BN)? | Implemented in code? |
|---|---|---|
| Home page + About page (incl. career roadmap milestones) | ✅ Yes | ✅ Yes |
| All 11 services' full copy (intro, who-needs-it, how-it-works, notes, CTAs) | ✅ Yes | ✅ Yes |
| 16 conditions/diseases, full copy | ✅ Yes | ❌ **No page built yet** |
| Video Library, Gallery, Chambers, Contact page-level copy | ✅ Yes | ⚠️ Partial — Video Library and Gallery exist as *home page teaser sections* only, not as their own dedicated pages; Chambers and Contact have no dedicated page at all yet |
| FAQ, Privacy, Terms, 404 copy | ✅ Yes | ❌ **No pages built yet** |
| 10 full SEO blog posts | ✅ Yes | ❌ **No blog system/pages built yet** |

**In short: the copywriting for the entire site is 100% done. Implementation is roughly 30-35% done** (Home, About, Services). Everything else in the table above just needs to be turned into working pages using copy that already exists, word-for-word — **do not write new copy for these pages; ask the client for the relevant copy file.** If anything there is ambiguous or looks incomplete, ask the client rather than inventing new copy.

---

## 5. What Is NOT Built Yet — full pending list

### 5.1 Pages to build (in the client's stated priority order — video/content-forward first)
1. **Dedicated Video Library page** (`/videos`) — the home page teaser is not the full library. Should use the same "Table of Contents" pattern as the home page section (reuse the component, don't rebuild it from scratch) but show **all** collected videos (currently 20, growing toward ~91), organized/filterable by category (see Section 3.1 — this is where the cataractcoach.com-style category structure actually gets used).
2. **Conditions page** (`/conditions`) — 16 conditions, copy already written. The client has not yet confirmed the exact interaction pattern for this page — **ask the client whether to use the same pinned-scroll-card style as Services, or a simpler grid+modal layout**, before building. Do not assume.
3. **Gallery page** (`/gallery`) — full photo/video gallery, home page currently only teases a handful.
4. **Chambers page** (`/chambers`) — the 3 chamber locations with full details (currently only teased on the home page).
5. **Contact page** (`/contact`) — see Section 5.2, this is more than "just a page," it changes site-wide CTA behavior.
6. **FAQ page** (`/faq`) — copy ready.
7. **Privacy Policy page** (`/privacy`) — copy ready.
8. **Terms of Use page** (`/terms`) — copy ready.
9. **Custom 404 page** — copy ready.
10. **Blog system** — 10 SEO posts already written. Needs: a blog index page, individual post pages, and a repeatable pattern for adding more posts later (see Section 9, SEO content pattern).

### 5.2 Contact page + site-wide CTA rework (client-specified flow, described in their own words during the build — implement exactly this)
The client explicitly changed direction on this mid-project: **it does not make sense for a WhatsApp chat to open immediately from every button, because the visitor hasn't yet seen which chamber the doctor is at, or on which day/time.** The correct flow is:
1. Build `/contact` showing all 3 chambers (name, address if available, day/time schedule — data already in `practice.chambers`) in a clean, scannable layout (reuse card/glass patterns already established).
2. **Every other CTA button on the site** (navbar "Book Now," hero CTAs, About/Services closing CTAs, footer, etc.) should point to `/contact` **instead of** opening WhatsApp directly.
3. At the bottom of `/contact`, place **exactly one** final "Message on WhatsApp" button — this is the *only* button on the entire site that should actually trigger the WhatsApp deep link (using the existing `whatsappHref()` helper and pre-filled message).
4. *(Optional enhancement, not required for launch but worth considering):* if the visitor selects/taps a specific chamber card on `/contact`, the pre-filled WhatsApp message could dynamically mention that chamber by name.

### 5.3 The doctor's Facebook Reels — video content pipeline (see Section 6, this got a dedicated requirement upgrade)

### 5.4 Hero image / doctor's photo — not placed anywhere yet
Three raw, unedited portrait photos of Dr. Nahal exist in the client's local files (outside this repo) — ask the client for them.

**None of these have been placed anywhere on the site yet** — not as a hero image, not in the About page, not anywhere. This is fully pending. See Section 10 for exact requirements on how these must be edited/prepared before use — **this does not touch the locked `HeroEyeZoom.tsx` eye-zoom animation** (that animation uses stock/generated eye close-up images, not a photo of the doctor); this is about the doctor's *own portrait* photos, which are meant for other placements (e.g., About page, a doctor-profile card, potentially a secondary hero-adjacent section).

### 5.5 Admin panel — does not exist yet at all
See Section 8 — this is a from-scratch build, currently the site has zero backend, zero database, zero auth, zero CMS.

---

## 6. NEW REQUIREMENT — YouTube Video Pipeline + Admin-Controlled Video Display

This is a requirement added by the client after the initial Facebook-embed approach, and it changes how videos should ultimately be delivered (though the Facebook embeds already built can stay live in the meantime — this is additive, not a rip-and-replace demand for the 20 already working).

**What the client wants:**
1. The doctor's videos need to be uploaded to a **YouTube channel** (channel setup/ownership is the client's responsibility, not a dev task — but confirm with the client whether the channel exists yet before building against it).
2. The **admin panel** (see Section 8) must have a simple video-management screen where an admin can **paste a YouTube link** (and, ideally, minimal metadata — title, category/tag, EN+BN caption) and have that video **immediately appear on the live website** — no code deploy needed, no developer involvement needed, this must be a real content-management workflow.
3. This should **replace the current approach of hardcoding video URLs into `src/lib/data/videos.ts`** — that file was always meant to be swapped for a real data source without needing to change any component code (this is explicitly documented as the design intent throughout the codebase's mock-data files) — the video-library UI components (`VideoTeaser.tsx` and the future dedicated `/videos` page) should be adapted to read from whatever the real backend/API becomes, keeping the same props/shape (`id`, `url`, `title: {en, bn}`, `tag: {en, bn}`) so the existing UI code needs minimal changes.
4. Embedding a YouTube video is technically simpler and more reliable than the current Facebook `iframe` embed approach (no login-wall/rate-limit issues, official `<iframe>` embed API, thumbnail auto-generation, etc.) — when you build this, prefer YouTube's standard embed (`https://www.youtube.com/embed/<video_id>`) over trying to keep supporting Facebook Reel embeds long-term. Facebook embeds can remain as a fallback/secondary source if convenient, but YouTube should become the primary path.
5. Category/tag support: the admin panel should let each video be tagged with one or more categories matching the site's specialties (Cataract, Retina, LASIK, Squint, Diabetic Eye Care, Glaucoma, Dry Eye, ROP, Oculoplasty, Pterygium, Trauma/Emergency — same 11 categories as the Services page) so the eventual dedicated Video Library page (Section 5.1, item 1) can filter by category, cataractcoach.com-style.

---

## 7. Detailed Bug History for the About-Page Career Roadmap — read before touching `RoadmapTimeline.tsx`

This component went through multiple rounds of user-reported bugs and root-cause fixes. If you need to modify this component for any reason, understand what was already fixed so you don't reintroduce it:

1. **Active dot centering was mathematically wrong initially** — fixed by correcting the side-padding formula to `clientWidth/2 - itemWidth/2` (centering the item's midpoint, not its edge).
2. **A real, confirmed browser bug:** a block-level flex track with no explicit width defaults to filling its *parent's* width instead of its actual content width — so when the flex children (dots) overflowed that box (because they have `flex-shrink: 0`), the browser's `scrollWidth` silently excluded the overflowing part, hard-capping how far the user could drag/scroll and making the last 2-3 timeline milestones permanently unreachable. **Fix:** give the scrolling track `width: max-content` so its width is computed from its actual content, not inherited from its parent.
3. A **separate** miscalculation of the trailing spacer's width (it was accidentally shortened by the same amount as the flex `gap`, which only applied to the *leading* spacer, not the trailing one) caused the very last milestone to still not perfectly center even after fix #2. Fixed by giving the trailing spacer its full, uncompensated width.
4. A stray **vertical center-guide line** shown behind the timeline was removed per client request (kept: a horizontal decorative line connecting the dots, which the client wanted retained).
5. **Magnetic snap-to-center** on drag release was added (`goTo(getClosestIndex())` on pointer-up) so releasing a drag always settles exactly on the nearest milestone rather than leaving it slightly off-center.
6. Drag handling uses **`window`-level** `pointermove`/`pointerup`/`pointercancel` listeners (not element-level) specifically so that moving the mouse fast past the element's edge, or releasing outside the element, never gets the drag "stuck."
7. **All of the above was verified with direct DOM measurement (`getBoundingClientRect`, `scrollWidth`, programmatic drag simulation), not just visual screenshots**, after an earlier round of "yes it's fixed" claims turned out to be false when checked only visually. **Any future fix to this component must be verified the same rigorous way — get real numbers, don't eyeball a screenshot and declare victory.**
8. The active-milestone display card was later enlarged to a large "hero card" (roughly 68-78vh tall on desktop/mobile respectively) per client request, with a large background watermark index number — this was a deliberate design change, not a bug, keep it.

---

## 8. Admin Panel — Full Requirements (build from scratch)

**Current state: zero backend exists.** Everything today is static TypeScript mock-data files (`src/lib/data/*.ts`) and static i18n dictionaries (`src/lib/i18n/*.ts`). This was **deliberately architected** so that swapping mock data for a real backend requires touching only the data-fetching layer, not the UI components — preserve this separation as you build the backend.

### 8.1 What must be fully admin-editable (create, edit, delete — for every item, in both languages)
- **Services** (currently 11, in `services.ts`) — including per-service image, stat, tags, and full modal copy (intro/who/how/steps/note/cta)
- **Conditions** (currently 16, in `conditions.ts` — this file is a bare-bones stub today, needs full bilingual content matching what's already written in the client's copy files)
- **Videos** — see Section 6, this is the priority admin feature (YouTube link + title + tags + EN/BN captions)
- **Gallery items** (photos/videos, currently in `gallery.ts`)
- **Reviews/testimonials** (currently in `reviews.ts`)
- **Chambers** (locations, days, hours — currently in `nav.ts` as `practice.chambers`)
- **Blog posts** (once built — full CRUD, not just the initial 10)
- **FAQ entries** (once built)
- **Practice-level settings**: doctor's name/credentials, WhatsApp number, pre-filled message text, email — currently hardcoded in `src/lib/i18n/nav.ts`'s `practice` object

### 8.2 Non-negotiable admin panel qualities
- Every content type above needs a working **Edit** and **Delete** action, not just "Add new" — the client was explicit that they must be able to "modify, change, or delete" everything smoothly.
- Every editable text field needs **both an English and a Bengali input** side by side (or clearly toggleable) — never ship an admin form that only has one language field for bilingual content.
- Keep the underlying data shape close to what the current mock files already use (`{ en: string, bn: string }` pairs for every piece of copy) so migrating existing content into the new backend is a straightforward one-time data-entry/import job, not a redesign.
- Image uploads (for services, gallery, videos' thumbnails if needed) should go through whatever storage the team chooses (S3, Cloudinary, Supabase Storage, etc.) — just make sure uploaded images get properly optimized (Next.js `<Image>` component is already used for images — e.g., `ServicesScroller.tsx` — keep using it, don't switch to plain `<img>` for anything that becomes backend-driven).

---

## 9. SEO Content Pattern — follow for any new copy

Ten SEO blog posts already exist (in the client's copy files) as the established pattern for any future content. Before writing new pages/posts/copy, read a couple of these existing posts and match:
- Tone: warm, plain-language, patient-facing (not clinical-journal tone), written in **ভাবানুবাদ (sense-for-sense) style for Bengali — never a literal word-for-word translation of the English**. Each language version was independently authored to read naturally in that language.
- Structure: clear H1/H2 hierarchy, scannable short paragraphs, a natural place for an internal link back to the relevant Service or Condition page, and a closing call-to-action.
- Keep both language versions equally complete — never publish an English post without its Bengali counterpart or vice versa, matching the site's "must be 100% bilingual, never partially translated" standard (Section 4.8).

---

## 10. Doctor's Photos — Editing Requirements Before Use

Three raw portrait photos of Dr. Nahal exist in the client's local files (outside this repo) — ask the client for them.

**Hard requirement, repeated for emphasis: the doctor's face must never be distorted, warped, or made to look unnatural in any edit.** Acceptable edits are things like: background cleanup/replacement, color grading/correction, brightness/contrast/sharpness adjustment, professional retouching (skin smoothing within reason, removing blemishes/glare), cropping/framing for the specific placement (square for a profile card, portrait for a hero-adjacent section, etc.), and consistent color-grading to match the site's teal/slate palette mood. **Do not** use any AI face-reshaping, face-swap, or "beautify" filter that changes the doctor's actual facial structure or proportions — the result must still clearly and accurately look like the same person, professionally presented.

These edited photos are needed for (at minimum): an About-page doctor profile section, and potentially a secondary "meet the doctor" hero-adjacent placement — **not** inside the locked `HeroEyeZoom.tsx` component, which is a separate, closed piece of the page.

---

## 11. Performance Requirement

**The site must be "super lightning fast" on both mobile and desktop — this is a hard, repeated client requirement, not a nice-to-have.** Concretely:
- Keep using `next/image` for all images (already the pattern) with correct `sizes` attributes so responsive images are actually served at the right resolution, not full-size everywhere.
- Lazy-load anything below the fold, especially the video embeds (iframes) once the Video Library page has dozens of videos — don't render 90 iframes on page load.
- Watch bundle size as the admin/backend gets added — don't pull in heavy client libraries for things a lightweight server-rendered approach could handle.
- GSAP/ScrollTrigger and Lenis are already in use and are fine to keep, but don't add a second competing animation library — stay consistent (see Section 12).
- Test real mobile performance (not just desktop-simulated-as-mobile) before considering any page "done."

---

## 12. Animation Consistency — match what's already there, don't introduce a different animation "voice"

The site currently uses a specific, consistent animation vocabulary. New pages/sections should draw from this same vocabulary rather than inventing new interaction styles:
- **Scroll-reveal fade-up** (`<Reveal>` component / `.reveal` CSS class) for most section entrances — the default, most common pattern.
- **Pinned full-bleed photo cards with scroll-linked blur/defocus** (GSAP ScrollTrigger, see Services page, Section 3.2/4.4) for any "scroll through a series of items with a photo each" content — this is the established pattern for Services, consider it for Conditions too (pending client confirmation, Section 5.1).
- **Horizontal drag-scroll timeline with a large "active item" hero card** (About page roadmap, Section 4.3) — this specific pattern is purpose-built for the career roadmap; don't reuse it elsewhere unless there's a genuinely similar "sequence of milestones" use case.
- **GSAP SplitText word-reveal** for page-title entrances (used on the About page H1).
- **Glassmorphism throughout** — glass cards, glass badges, glass buttons — this is the site's core visual signature, not just a hero-section flourish. Every new card/panel/modal should default to a glass treatment unless there's a specific reason not to (e.g., the Services cards deliberately do *not* use a glass panel over their photos, per Section 4.4 — that was an explicit exception, not the new default).
- Icons: **Lucide only**, line-style, matching sizes/weights already used elsewhere on the page you're extending.

---

## 13. Quick File-Map Reference

```
dr-nahal-website/
├── src/
│   ├── app/
│   │   ├── page.tsx                    → redirects to /en
│   │   ├── layout.tsx                  → root layout, fonts, <SmoothScroll/>
│   │   ├── globals.css                 → 🎨 ALL design tokens live here
│   │   └── [lang]/
│   │       ├── layout.tsx              → Navbar + Footer wrapper, validates lang param
│   │       ├── page.tsx                → HOME PAGE composition
│   │       ├── about/page.tsx          → About page composition
│   │       └── services/page.tsx       → Services page composition
│   ├── components/
│   │   ├── HeroEyeZoom.tsx             → 🔒 LOCKED, do not touch (Section 0)
│   │   ├── Navbar.tsx / Footer.tsx     → site chrome, bilingual
│   │   ├── Reveal.tsx                  → scroll-reveal wrapper component
│   │   ├── SmoothScroll.tsx            → Lenis + GSAP ticker setup
│   │   ├── home/                       → one file per home-page section
│   │   ├── about/                      → About page sections
│   │   └── services/ServicesScroller.tsx
│   └── lib/
│       ├── i18n/                       → ALL bilingual copy dictionaries + `practice` settings object + `whatsappHref()` helper
│       └── data/                       → mock data (services, conditions, gallery, reviews, videos) — swap for real backend later, keep the same shapes
└── public/images/                      → all static images (hero eye sequence, service photos)
```

**Note:** the client's source planning materials (full website copy for every page, the original Frontend Master Spec, raw doctor photos, the Facebook Reels tracking sheet, and reference images) live in the client's local project folder, **outside this repo**. Ask the client for these when you need them — do not try to recreate this content from scratch.

---

## 14. Summary Checklist for the Incoming Developer

**Before writing any code:**
- [ ] Read Section 0 twice. `HeroEyeZoom.tsx` is off-limits, forever, for this entire project.
- [ ] Read `node_modules/next/dist/docs/` for this specific Next.js version before writing route code — its App Router APIs differ from older training data.
- [ ] Confirm with the client whether the YouTube channel (Section 6) already exists before building the video pipeline against it.
- [ ] Confirm with the client the interaction pattern for the Conditions page (Section 5.1, item 2) before building it.
- [ ] Ask the client for the copy files, doctor photos, and Facebook Reels tracking sheet referenced throughout this document — they are not in this repo.

**Build order suggestion (not mandatory, but logical given priorities stated by the client):**
1. Admin panel foundation (auth + basic CRUD scaffolding) — everything else benefits from this existing first
2. Video management in the admin panel + YouTube pipeline (Section 6) — the client's stated highest-priority content type
3. `/contact` page + site-wide CTA rework (Section 5.2)
4. Remaining pages in the order listed in Section 5.1 (Video Library full page, Conditions, Gallery, Chambers, FAQ, Privacy, Terms, 404, Blog)
5. Doctor photo editing + placement (Section 10) — can happen in parallel with any of the above, it's independent
6. Wire the finished admin panel into every content type so nothing is left hardcoded in `src/lib/data/*.ts` or `src/lib/i18n/*.ts`

**Never:**
- Touch `HeroEyeZoom.tsx`
- Introduce a new color, font, or icon set outside what's documented in Section 2
- Write new copy for pages that already have copy written by the client — ask for the file instead
- Ship a bilingual feature with only one language done
- Set `overflow-x: hidden` on `<body>` (Section 4.5, point 4)
- Claim a bug is fixed based on a screenshot alone — verify with real measurements (Section 7, point 7)
