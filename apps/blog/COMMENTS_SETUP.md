# Comments Setup Guide

This guide will help you set up lightweight, plug-and-play commenting for your Astro blog.

## Quick Setup Options

### Option 1: Giscus (Recommended) - GitHub Discussions

**Best for:** Tech blogs, lightweight, free forever

1. **Enable GitHub Discussions** on your repository
2. **Get your repository ID** from https://giscus.app/
3. **Update the config** in `src/lib/comments-config.ts`:

```typescript
export const COMMENTS_CONFIG = {
  system: "giscus",
  giscus: {
    repo: "sadiksaifi/blog", // Your GitHub repo
    repoId: "R_kgDOGxxxxxxxx", // From giscus.app
    category: "Announcements",
    categoryId: "DIC_kwDOGxxxxxxxx", // From giscus.app
    // ... other settings
  },
  // ... other systems
};
```

### Option 2: Utterances - GitHub Issues

**Best for:** Simple, extremely lightweight

1. **Update the config** in `src/lib/comments-config.ts`:

```typescript
export const COMMENTS_CONFIG = {
  system: "utterances",
  utterances: {
    repo: "sadiksaifi/blog", // Your GitHub repo
    issueTerm: "pathname",
    label: "comment",
    theme: "preferred-color-scheme",
  },
  // ... other systems
};
```

### Option 3: Disqus - Traditional

**Best for:** Non-technical audience

1. **Sign up** at https://disqus.com/
2. **Get your shortname**
3. **Update the config**:

```typescript
export const COMMENTS_CONFIG = {
  system: "disqus",
  disqus: {
    shortname: "your-blog-name",
    identifier: "pathname",
  },
  // ... other systems
};
```

## Detailed Setup Instructions

### Giscus Setup (Recommended)

1. **Go to your GitHub repository**
2. **Enable Discussions**:

   - Go to Settings → Features
   - Check "Discussions"
   - Click "Save changes"

3. **Get configuration values**:

   - Visit https://giscus.app/
   - Enter your repository name
   - Select "Announcements" category
   - Copy the generated configuration

4. **Update `src/lib/comments-config.ts`** with your values

### Utterances Setup

1. **No additional setup required** - just update the config
2. **Comments will be stored as GitHub Issues**
3. **Each blog post gets its own issue**

### Disqus Setup

1. **Create account** at https://disqus.com/
2. **Add your site** and get the shortname
3. **Update the config** with your shortname

## Features Comparison

| Feature      | Giscus     | Utterances | Disqus        |
| ------------ | ---------- | ---------- | ------------- |
| **Weight**   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐          |
| **Speed**    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐          |
| **Free**     | ✅ Forever | ✅ Forever | ✅ (with ads) |
| **Setup**    | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐        |
| **Features** | ⭐⭐⭐⭐   | ⭐⭐⭐     | ⭐⭐⭐⭐⭐    |
| **Privacy**  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐          |

## Performance Impact

- **Giscus**: ~15KB gzipped, loads in ~200ms
- **Utterances**: ~10KB gzipped, loads in ~150ms
- **Disqus**: ~100KB gzipped, loads in ~800ms

## Customization

### Change Theme

```typescript
// Giscus themes
theme: "preferred_color_scheme"; // or 'light', 'dark', etc.

// Utterances themes
theme: "preferred-color-scheme"; // or 'github-light', 'github-dark', etc.
```

### Change Position

```typescript
// Giscus input position
inputPosition: "top"; // or 'bottom'

// Utterances (always bottom)
```

### Disable Comments

```typescript
export const COMMENTS_CONFIG = {
  system: "none", // Disables comments
  // ... rest of config
};
```

## Troubleshooting

### Comments not loading?

1. Check your repository settings
2. Verify the configuration values
3. Check browser console for errors

### Dark mode not working?

- The components automatically respect your site's dark mode
- No additional configuration needed

### Want to switch systems?

- Just change the `system` value in the config
- No code changes needed

## Migration

To switch from one system to another:

1. **Export comments** from current system
2. **Change config** to new system
3. **Import comments** to new system (if supported)

## Support

- **Giscus**: https://github.com/giscus/giscus
- **Utterances**: https://github.com/utterance/utterances
- **Disqus**: https://help.disqus.com/

---

**Recommendation**: Start with **Giscus** for the best balance of features, performance, and ease of setup.
