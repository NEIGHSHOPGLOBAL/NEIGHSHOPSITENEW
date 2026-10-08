export const EMPTY_TRACKING = {
  enabled: true,
  gtmId: '',
  ga4Id: '',
  googleAdsId: '',
  googleAdsLabel: '',
  metaPixelId: '',
  linkedinPartnerId: '',
  tiktokPixelId: '',
  twitterPixelId: '',
  pinterestTagId: '',
  clarityId: '',
  hotjarId: '',
  searchConsoleVerification: '',
  bingVerification: '',
  facebookDomainVerification: '',
  customHeadHtml: '',
  customBodyHtml: '',
}

export const TRACKING_GROUPS = [
  {
    title: 'Google',
    hint: 'If GA4 or Google Ads already live inside your Tag Manager container, leave those IDs empty so visits are not counted twice.',
    fields: [
      { key: 'gtmId', label: 'Google Tag Manager', placeholder: 'GTM-XXXXXXX', pattern: /^GTM-[A-Z0-9]+$/, help: 'Container ID from tagmanager.google.com' },
      { key: 'ga4Id', label: 'Google Analytics 4', placeholder: 'G-XXXXXXXX', pattern: /^G-[A-Z0-9]+$/, help: 'Measurement ID from GA4 Admin → Data streams' },
      { key: 'googleAdsId', label: 'Google Ads', placeholder: 'AW-123456789', pattern: /^AW-\d+$/, help: 'Conversion ID' },
      { key: 'googleAdsLabel', label: 'Google Ads conversion label', placeholder: 'AbC123', pattern: /^[A-Za-z0-9_-]{1,80}$/, help: 'Optional. Used with the Ads ID.' },
    ],
  },
  {
    title: 'Pixels',
    fields: [
      { key: 'metaPixelId', label: 'Meta (Facebook) Pixel', placeholder: '123456789012345', pattern: /^\d{5,20}$/ },
      { key: 'linkedinPartnerId', label: 'LinkedIn Insight Tag', placeholder: '1234567', pattern: /^\d{4,12}$/ },
      { key: 'tiktokPixelId', label: 'TikTok Pixel', placeholder: 'CXXXXXXXXXXXXXXX', pattern: /^[A-Z0-9]{8,32}$/ },
      { key: 'twitterPixelId', label: 'X (Twitter) Pixel', placeholder: 'o1234', pattern: /^[A-Za-z0-9]{4,20}$/ },
      { key: 'pinterestTagId', label: 'Pinterest Tag', placeholder: '2612345678901', pattern: /^\d{5,20}$/ },
    ],
  },
  {
    title: 'Session tools',
    fields: [
      { key: 'clarityId', label: 'Microsoft Clarity', placeholder: 'abcdefghij', pattern: /^[A-Za-z0-9]{6,20}$/ },
      { key: 'hotjarId', label: 'Hotjar site ID', placeholder: '1234567', pattern: /^\d{4,12}$/ },
    ],
  },
  {
    title: 'Site verification',
    fields: [
      { key: 'searchConsoleVerification', label: 'Google Search Console', placeholder: 'verification token', pattern: /^[A-Za-z0-9_-]{8,128}$/ },
      { key: 'bingVerification', label: 'Bing Webmaster', placeholder: 'verification token', pattern: /^[A-Za-z0-9]{8,128}$/ },
      { key: 'facebookDomainVerification', label: 'Meta domain verification', placeholder: 'verification token', pattern: /^[A-Za-z0-9]{8,128}$/ },
    ],
  },
]

export function trackingError(key, value, pattern) {
  const raw = (value || '').trim()
  if (!raw || !pattern) return ''
  return pattern.test(raw) ? '' : 'This ID does not match the expected format.'
}
