import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSiteData } from '../../context/SiteDataContext'
import { EMPTY_TRACKING, TRACKING_GROUPS } from '../../lib/tracking'

function valid(key, value) {
  const field = TRACKING_GROUPS.flatMap((g) => g.fields).find((f) => f.key === key)
  const raw = (value || '').trim()
  if (!raw) return ''
  if (field && !field.pattern.test(raw)) return ''
  return raw
}

function addScript(id, { src, text } = {}) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  if (src) {
    script.src = src
    script.async = true
  }
  if (text) script.text = text
  document.head.appendChild(script)
}

function addMeta(id, name, content) {
  if (!content || document.getElementById(id)) return
  const meta = document.createElement('meta')
  meta.id = id
  meta.name = name
  meta.content = content
  document.head.appendChild(meta)
}

function injectHtml(id, html, target) {
  if (!html?.trim() || document.getElementById(id)) return
  const holder = document.createElement('div')
  holder.id = id
  holder.innerHTML = html
  const scripts = [...holder.querySelectorAll('script')]
  scripts.forEach((old) => {
    const script = document.createElement('script')
    ;[...old.attributes].forEach((attr) => script.setAttribute(attr.name, attr.value))
    script.text = old.textContent
    old.replaceWith(script)
  })
  target.appendChild(holder)
}

export default function TrackingScripts() {
  const settings = useSiteData()
  const tracking = { ...EMPTY_TRACKING, ...(settings?.tracking || {}) }
  const { pathname } = useLocation()
  const skippedFirst = useRef(false)

  useEffect(() => {
    if (!settings || tracking.enabled === false) return

    const gtm = valid('gtmId', tracking.gtmId)
    const ga4 = valid('ga4Id', tracking.ga4Id)
    const ads = valid('googleAdsId', tracking.googleAdsId)
    const adsLabel = valid('googleAdsLabel', tracking.googleAdsLabel)
    const metaPixel = valid('metaPixelId', tracking.metaPixelId)
    const linkedin = valid('linkedinPartnerId', tracking.linkedinPartnerId)
    const tiktok = valid('tiktokPixelId', tracking.tiktokPixelId)
    const twitter = valid('twitterPixelId', tracking.twitterPixelId)
    const pinterest = valid('pinterestTagId', tracking.pinterestTagId)
    const clarity = valid('clarityId', tracking.clarityId)
    const hotjar = valid('hotjarId', tracking.hotjarId)

    if (gtm) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
      addScript('ns-gtm', { src: `https://www.googletagmanager.com/gtm.js?id=${gtm}` })
      if (!document.getElementById('ns-gtm-noscript')) {
        const noscript = document.createElement('noscript')
        noscript.id = 'ns-gtm-noscript'
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        document.body.prepend(noscript)
      }
    }

    const gtagId = ga4 || ads
    if (gtagId) {
      addScript('ns-gtag', { src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}` })
      const configs = [
        ga4 ? `gtag('config','${ga4}');` : '',
        ads ? `gtag('config','${ads}');` : '',
      ].join('')
      addScript('ns-gtag-init', {
        text: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${configs}`,
      })
      if (ads && adsLabel) {
        window.__nsAds = { id: ads, label: adsLabel }
      }
    }

    if (metaPixel) {
      addScript('ns-meta', {
        text: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`,
      })
    }

    if (linkedin) {
      addScript('ns-li-init', {
        text: `window._linkedin_partner_id="${linkedin}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(window._linkedin_partner_id);`,
      })
      addScript('ns-li', { src: 'https://snap.licdn.com/li.lms-analytics/insight.min.js' })
    }

    if (tiktok) {
      addScript('ns-tt', {
        text: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=n;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]={};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=n+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktok}');ttq.page()}(window,document,'ttq');`,
      })
    }

    if (twitter) {
      addScript('ns-tw', {
        text: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments)},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','${twitter}');`,
      })
    }

    if (pinterest) {
      addScript('ns-pin', {
        text: `!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");pintrk('load','${pinterest}');pintrk('page');`,
      })
    }

    if (clarity) {
      addScript('ns-clarity', {
        text: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarity}");`,
      })
    }

    if (hotjar) {
      addScript('ns-hj', {
        text: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjar},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r)})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
      })
    }

    addMeta('ns-gsc', 'google-site-verification', valid('searchConsoleVerification', tracking.searchConsoleVerification))
    addMeta('ns-bing', 'msvalidate.01', valid('bingVerification', tracking.bingVerification))
    addMeta('ns-fb-domain', 'facebook-domain-verification', valid('facebookDomainVerification', tracking.facebookDomainVerification))
    injectHtml('ns-custom-head', tracking.customHeadHtml, document.head)
    injectHtml('ns-custom-body', tracking.customBodyHtml, document.body)
  }, [pathname, settings, tracking.enabled, tracking.gtmId, tracking.ga4Id, tracking.googleAdsId, tracking.googleAdsLabel, tracking.metaPixelId, tracking.linkedinPartnerId, tracking.tiktokPixelId, tracking.twitterPixelId, tracking.pinterestTagId, tracking.clarityId, tracking.hotjarId, tracking.searchConsoleVerification, tracking.bingVerification, tracking.facebookDomainVerification, tracking.customHeadHtml, tracking.customBodyHtml])

  useEffect(() => {
    if (!skippedFirst.current) {
      skippedFirst.current = true
      return
    }
    if (window.gtag) window.gtag('event', 'page_view', { page_path: pathname })
    if (window.fbq) window.fbq('track', 'PageView')
    if (window.ttq?.page) window.ttq.page()
    if (window.pintrk) window.pintrk('page')
    if (window.dataLayer) window.dataLayer.push({ event: 'page_view', page_path: pathname })
  }, [pathname])

  return null
}
