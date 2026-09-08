// Mock data — swap for a Supabase query later. Component code should not need to change.
//
// NOTE: titles/tags below are honest PLACEHOLDERS ("Patient Video 01", etc).
// These 20 reels were collected from Dr. Nahal's Facebook page but we don't
// yet know what each one actually shows — replace title/tag once the doctor
// or team identifies the content of each clip.
export type Video = {
  id: string;
  url: string;
  title: { en: string; bn: string };
  tag: { en: string; bn: string };
};

export const videos: Video[] = [
  { id: "v1", url: "https://www.facebook.com/reel/2501956403648796/" },
  { id: "v2", url: "https://www.facebook.com/reel/1046331278202787/" },
  { id: "v3", url: "https://www.facebook.com/reel/1464574421881326/" },
  { id: "v4", url: "https://www.facebook.com/reel/1030561718925815/" },
  { id: "v5", url: "https://www.facebook.com/reel/3692110467599856/" },
  { id: "v6", url: "https://www.facebook.com/reel/2799951363726840/" },
  { id: "v7", url: "https://www.facebook.com/reel/3899273333666107/" },
  { id: "v8", url: "https://www.facebook.com/reel/1023906449183244/" },
  { id: "v9", url: "https://www.facebook.com/reel/1158053779667028/" },
  { id: "v10", url: "https://www.facebook.com/reel/1025162328944037/" },
  { id: "v11", url: "https://www.facebook.com/reel/1367820534416230/" },
  { id: "v12", url: "https://www.facebook.com/reel/2087964581676985/" },
  { id: "v13", url: "https://www.facebook.com/reel/689643566895874/" },
  { id: "v14", url: "https://www.facebook.com/reel/2476263316049356/" },
  { id: "v15", url: "https://www.facebook.com/reel/2504253599911018/" },
  { id: "v16", url: "https://www.facebook.com/reel/670614362579249/" },
  { id: "v17", url: "https://www.facebook.com/reel/645698898205398/" },
  { id: "v18", url: "https://www.facebook.com/reel/1294414424983724/" },
  { id: "v19", url: "https://www.facebook.com/reel/1315641429733507/" },
  { id: "v20", url: "https://www.facebook.com/reel/2030568157424764/" },
].map((v, i) => ({
  ...v,
  title: {
    en: `Video ${String(i + 1).padStart(2, "0")}`,
    bn: `ভিডিও ${String(i + 1).padStart(2, "0")}`,
  },
  tag: { en: "Uncategorized", bn: "শ্রেণীবিহীন" },
}));
