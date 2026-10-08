"""One-off content migration: update all 9 Service records from content.md."""
from app import create_app
from app.extensions import db
from app.models import Service, Faq

app = create_app()

SERVICES = {
    "custom-website-development": {
        "new_slug": "custom-website-development",
        "name": "Custom Website Development",
        "icon_key": "globe",
        "short_desc": "Custom, responsive, SEO-friendly websites and web apps built with Next.js and React. Clean code you own, structured to rank from day one.",
        "features": ["Responsive Design", "Admin Panel", "API Integrations", "SEO-Friendly", "Core Web Vitals"],
        "meta_title": "Website Development Company in Delhi | Neighshop Global",
        "meta_description": "Custom, responsive, SEO-friendly websites and web apps built with Next.js and React. Admin panel, API integrations and fast load times. Get a free quote today.",
        "html": """
<p>Your website is your hardest-working salesperson. It's open 24/7, and it's often the first impression a customer gets of your business. Neighshop Global builds custom websites and web applications that look premium, load in under two seconds, and are structured to rank on Google from day one. No bloated templates and no page builders that slow you down: just clean, modern code you own.</p>

<h2>Websites We Build</h2>
<ul>
<li><strong>Business &amp; corporate websites:</strong> Credibility-building sites with clear service pages, lead forms and Google-ready structure.</li>
<li><strong>Portfolio websites:</strong> Showcase sites for creators, architects, agencies and professionals.</li>
<li><strong>SaaS websites:</strong> Product marketing sites with pricing pages, docs and sign-up flows.</li>
<li><strong>Web applications:</strong> Customer portals, dashboards, booking systems and internal tools.</li>
<li><strong>CMS-powered sites:</strong> An easy admin panel so your team can edit pages, blogs and SEO without a developer.</li>
</ul>

<h2>What's Included</h2>
<ul>
<li><strong>Fully responsive design:</strong> Pixel-perfect on mobile, tablet and desktop.</li>
<li><strong>Admin panel:</strong> Manage content, blogs, leads and media yourself.</li>
<li><strong>API integrations:</strong> Payment gateways, CRMs, WhatsApp, email, maps, analytics and more.</li>
<li><strong>SEO-friendly build:</strong> Clean URLs, meta tags, schema markup, XML sitemap, Core Web Vitals optimisation.</li>
<li><strong>Security basics:</strong> SSL, secure headers, spam-protected forms and regular backups.</li>
<li><strong>Analytics setup:</strong> Google Analytics 4 and Google Search Console connected at launch.</li>
</ul>

<h2>Built on Modern Technology</h2>
<p>We build with <strong>Next.js, React and TypeScript</strong> on the frontend and <strong>Node.js, Python or Django</strong> on the backend, with <strong>PostgreSQL or MongoDB</strong> databases deployed on <strong>AWS</strong> with Docker. That gives you static-site speed with dynamic power, and a codebase any good developer can maintain.</p>

<h2>Why Speed and SEO Matter in 2026</h2>
<p>Google uses Core Web Vitals (LCP, INP and CLS) as ranking signals, and AI search experiences like Google AI Overviews draw from pages that are well-structured and easy to crawl. A slow, template-heavy site loses rankings and customers. Every Neighshop website targets a Lighthouse score of 90+ on mobile and ships with structured data, so search engines and AI assistants understand your business.</p>

<h2>Our Website Development Process</h2>
<ol>
<li>Discovery call and sitemap planning</li>
<li>Wireframes and UI design (you approve before development)</li>
<li>Development with weekly previews</li>
<li>Content upload, SEO setup and testing on real devices</li>
<li>Launch, Search Console submission and handover training</li>
<li>3–6 months of post-launch support</li>
</ol>

<h2>Who It's For</h2>
<p>Startups launching their first site, SMEs replacing an outdated website, D2C brands, clinics, schools, real-estate firms, consultants and any business that wants its website to generate leads, not just exist.</p>
""",
        "faqs": [
            ("How much does a website cost?", "It depends on page count, features and integrations. A simple business site costs far less than a custom web application. Share your requirements and we'll send a fixed quote."),
            ("How long does it take to build a website?", "A standard business website usually takes 2–4 weeks. Web applications take longer depending on scope."),
            ("Will I be able to update the website myself?", "Yes. We include an admin panel so you can edit text, images, blogs and SEO fields without coding."),
            ("Do you redesign existing websites?", "Yes. We can redesign and migrate your current site while protecting your existing Google rankings with proper 301 redirects."),
            ("Do I own the website code?", "Full source code ownership is available on eligible projects."),
        ],
    },
    "mobile-app-development": {
        "new_slug": "mobile-app-development",
        "name": "Mobile App Development",
        "icon_key": "smartphone",
        "short_desc": "Android and iOS apps in Flutter and React Native for e-commerce, healthcare, fintech and on-demand businesses, built on scalable cloud architecture.",
        "features": ["Android", "iOS", "Flutter", "React Native", "MVP Development"],
        "meta_title": "Mobile App Development Company in Delhi | Neighshop Global",
        "meta_description": "Android and iOS app development in Flutter and React Native for e-commerce, healthcare, fintech and on-demand startups. Source code ownership and support.",
        "html": """
<p>A great app idea needs great execution: smooth performance, intuitive design, and a backend that doesn't buckle when users show up. Neighshop Global builds Android and iOS apps with modern cross-platform frameworks and scalable cloud architecture, so you launch faster, spend less, and grow without rebuilding.</p>

<h2>Mobile App Development Services</h2>
<ul>
<li><strong>Android app development:</strong> Native-quality apps published on Google Play.</li>
<li><strong>iOS app development:</strong> Polished iPhone and iPad apps that meet App Store guidelines.</li>
<li><strong>Cross-platform apps:</strong> One codebase for both platforms with Flutter or React Native, which cuts cost and time to market.</li>
<li><strong>MVP development:</strong> Launch a lean first version in weeks and validate your idea with real users.</li>
<li><strong>App backend &amp; admin panel:</strong> APIs, databases, dashboards and analytics to run your business.</li>
<li><strong>App maintenance &amp; upgrades:</strong> OS updates, new features, bug fixes and performance tuning.</li>
</ul>

<h2>Apps for Every Industry</h2>
<ul>
<li><strong>E-commerce &amp; quick commerce:</strong> Catalogues, carts, UPI and card payments, order tracking.</li>
<li><strong>Healthcare:</strong> Doctor booking, telemedicine, pharmacy delivery, lab test booking.</li>
<li><strong>Fintech:</strong> Wallets, payment flows, loan applications, KYC workflows.</li>
<li><strong>On-demand services:</strong> Ride-hailing, home services, delivery and booking apps.</li>
<li><strong>Social &amp; community:</strong> Dating, chat, content and creator apps.</li>
<li><strong>Logistics:</strong> Driver apps, fleet tracking and proof-of-delivery.</li>
</ul>

<h2>Features We Commonly Build</h2>
<p>User login (OTP, Google, Apple) · Push notifications · Real-time GPS tracking · In-app chat · Payment gateway integration (Razorpay, Stripe, UPI) · Ratings &amp; reviews · Multi-language support · Analytics dashboards · AI chatbots and recommendations</p>

<h2>Flutter or React Native?</h2>
<p>Both frameworks deliver near-native performance from a single codebase. We recommend <strong>Flutter</strong> for highly custom, animation-rich UIs and <strong>React Native</strong> when you want to share logic with a React web app. We pick what fits your product, not what's trendy.</p>

<h2>Our App Development Process</h2>
<p>Discovery → Scope &amp; user flows → UI/UX design → Sprint-based development → QA on real devices → Play Store &amp; App Store launch → 3–6 months of support.</p>
""",
        "faqs": [
            ("How much does it cost to build an app in India?", "Cost depends on features, platforms and integrations. A focused MVP costs far less than a full marketplace with three apps. Ask for a free estimate."),
            ("How long does app development take?", "A simple MVP can launch in about 6–10 weeks. Complex multi-app platforms take several months."),
            ("Will you publish the app on Play Store and App Store?", "Yes. We handle the submission process and guide you through developer account setup."),
            ("Do I get the source code?", "Full source code ownership is available for eligible projects and products."),
            ("Can you take over an existing app?", "Yes. We audit the current code and then fix, upgrade or rebuild it as needed."),
        ],
    },
    "crm-custom-software": {
        "new_slug": "crm-custom-software",
        "name": "CRM & Custom Software",
        "icon_key": "layout-grid",
        "short_desc": "Custom CRM, ERP, inventory, HR and automation systems shaped around your exact processes, with role-based access and API integrations.",
        "features": ["Automation", "Custom Reporting", "Role-Based Access", "API Integrations", "AI Agents"],
        "meta_title": "Custom CRM & Software Development India | Neighshop Global",
        "meta_description": "Custom CRM, ERP, inventory, HR and business automation software built around your workflows. Role-based access, reports and API integrations. Free consultation.",
        "html": """
<p>Off-the-shelf software forces your team to change how they work. Custom software does the opposite. Neighshop Global builds CRM, ERP, inventory, HR and automation systems shaped around your exact processes, so your team spends less time on spreadsheets and more time on customers.</p>

<h2>Software We Build</h2>
<ul>
<li><strong>Custom CRM:</strong> Lead capture, pipelines, follow-up reminders, WhatsApp and email integration, sales reports.</li>
<li><strong>ERP systems:</strong> Purchase, sales, accounts, production and multi-branch operations in one place.</li>
<li><strong>Inventory management:</strong> Stock tracking, barcode/QR, low-stock alerts, warehouse transfers.</li>
<li><strong>HR &amp; payroll (HRMS):</strong> Attendance, leave, payroll, employee self-service.</li>
<li><strong>Clinic &amp; practice management:</strong> Appointments, patient records, billing. See our Orbito CRM demo.</li>
<li><strong>Internal tools &amp; dashboards:</strong> Approvals, ticketing, field-force tracking, MIS reports.</li>
</ul>

<h2>Built-In Capabilities</h2>
<ul>
<li><strong>Automation:</strong> Auto-assign leads, trigger follow-ups, generate invoices, send reminders.</li>
<li><strong>Productivity:</strong> Fewer clicks, fewer spreadsheets, one source of truth.</li>
<li><strong>Custom reporting:</strong> Real-time dashboards and exportable reports for every department.</li>
<li><strong>Role-based access:</strong> Each user sees only what they need, with an audit trail.</li>
<li><strong>API integrations:</strong> Tally, payment gateways, WhatsApp Business API, Google Workspace, accounting and e-commerce platforms.</li>
<li><strong>Scalable architecture:</strong> Cloud-hosted on AWS and ready to grow with your team.</li>
</ul>

<h2>Add AI Where It Pays Off</h2>
<p>Modern business software can do more than store data. We integrate <strong>AI agents and LLMs</strong> to summarise customer conversations, score leads, draft follow-up emails, extract data from invoices, and answer staff questions from your own documents. These are practical automations that save hours every week.</p>

<h2>Custom vs Off-the-Shelf</h2>
<p>Ready-made CRMs charge per user, every month, forever, and still need workarounds. A custom system has an upfront cost, but no per-seat fees, no unused features, and full ownership.</p>
""",
        "faqs": [
            ("How long does custom software take to build?", "A focused CRM or internal tool can go live in a few weeks. A multi-module ERP is usually delivered in phases over several months."),
            ("Can you migrate data from Excel or our current software?", "Yes. Data migration and cleanup are part of our onboarding process."),
            ("Is my data secure?", "We use role-based access, encrypted connections, regular backups and secure cloud hosting."),
            ("Can the software work on mobile?", "Yes. We build responsive web apps, and can add Android/iOS apps for field teams."),
            ("Do we own the software?", "Full source code ownership is available for eligible projects."),
        ],
    },
    "seo-services": {
        "new_slug": "seo-services",
        "name": "Search Engine Optimization",
        "icon_key": "search",
        "short_desc": "Technical, on-page and off-page SEO that earns rankings on Google and visibility in AI search — built for how people search in 2026.",
        "features": ["Technical SEO", "On-Page SEO", "Local SEO", "GEO / AEO", "Backlinks"],
        "meta_title": "SEO Services Company in Delhi | Neighshop Global",
        "meta_description": "Technical SEO, on-page optimisation and quality backlinks that grow organic traffic on Google and AI search. Transparent reporting. Get a free SEO audit.",
        "html": """
<p>Ranking on page one isn't luck. It's the result of a technically sound website, content that genuinely answers searchers' questions, and authority earned from other sites. Neighshop Global's SEO team handles all three, and adapts your strategy for how people search in 2026: on Google, in AI Overviews, and inside AI assistants.</p>

<h2>Our SEO Services</h2>
<ul>
<li><strong>Technical SEO:</strong> Site speed, Core Web Vitals, crawlability, indexation, XML sitemaps, schema markup, canonical tags, redirects and mobile usability.</li>
<li><strong>On-page SEO:</strong> Keyword research, title and meta optimisation, heading structure, internal linking and content optimisation.</li>
<li><strong>Content strategy:</strong> Topic clusters, blog plans and service pages that target high-intent keywords.</li>
<li><strong>Backlinks &amp; off-page SEO:</strong> Relevant, white-hat link building, digital PR and citations.</li>
<li><strong>Local SEO:</strong> Google Business Profile optimisation, local citations and city landing pages to win "near me" searches.</li>
<li><strong>E-commerce SEO:</strong> Category and product page optimisation, faceted navigation fixes, product schema.</li>
</ul>

<h2>SEO for AI Search (GEO / AEO)</h2>
<p>Search is changing. Google AI Overviews and AI chat assistants now answer many questions directly. <strong>Generative Engine Optimisation (GEO)</strong> and <strong>Answer Engine Optimisation (AEO)</strong> make your brand the source those systems cite, through clear structured data, concise expert answers, FAQ content, consistent business information across the web, and genuine topical authority. We build this into every SEO plan.</p>

<h2>How We Work</h2>
<ol>
<li><strong>SEO audit:</strong> A full technical and content audit with a prioritised fix list.</li>
<li><strong>Keyword &amp; competitor research:</strong> Find the terms your buyers actually search.</li>
<li><strong>Fixes &amp; optimisation:</strong> Technical repairs and on-page improvements.</li>
<li><strong>Content &amp; links:</strong> An ongoing publishing and authority-building plan.</li>
<li><strong>Monthly reporting:</strong> Rankings, traffic, leads and next steps in plain language.</li>
</ol>

<h2>What We Don't Do</h2>
<p>No guaranteed "#1 in 7 days" promises, no spammy link farms, no keyword stuffing. These tactics can get sites penalised. We focus on sustainable growth that compounds.</p>
""",
        "faqs": [
            ("How long does SEO take to show results?", "Most sites see meaningful movement in 3–6 months. Competitive keywords can take longer."),
            ("Do you guarantee first-page rankings?", "No honest agency can guarantee rankings, because Google controls them. We commit to a transparent process and measurable progress."),
            ("Do you do local SEO for Delhi businesses?", "Yes. Local SEO and Google Business Profile optimisation are core services."),
            ("Can you fix a site that lost traffic after a Google update?", "Yes. We audit content quality, technical issues and links to find and fix the cause."),
            ("Do you write the content?", "Yes. Our team writes SEO-optimised blogs and page copy, or optimises content you provide."),
        ],
    },
    "social-media-marketing": {
        "new_slug": "social-media-marketing",
        "name": "Social Media Marketing",
        "icon_key": "share-2",
        "short_desc": "Instagram, Facebook, LinkedIn and YouTube strategy, content and ads that turn followers into customers.",
        "features": ["Instagram", "Facebook", "LinkedIn", "YouTube", "Paid Ads"],
        "meta_title": "Social Media Marketing Agency in Delhi | Neighshop Global",
        "meta_description": "Instagram, Facebook, LinkedIn and YouTube marketing: strategy, content, Reels and paid ads that build your brand and bring in leads. Talk to our team today.",
        "html": """
<p>Your customers scroll for hours every day. Social media marketing puts your brand in that feed with content they want to watch and offers they want to act on. Neighshop Global plans, creates and manages social media for businesses that want growth, not just likes.</p>

<h2>Platforms We Manage</h2>
<ul>
<li><strong>Instagram:</strong> Reels, carousels, stories, influencer collaborations and shoppable posts.</li>
<li><strong>Facebook:</strong> Community building, local reach and high-ROI Meta ads.</li>
<li><strong>LinkedIn:</strong> Thought leadership, founder branding and B2B lead generation.</li>
<li><strong>YouTube:</strong> Channel strategy, Shorts, long-form editing and YouTube ads.</li>
</ul>

<h2>What's Included</h2>
<ul>
<li>Social media strategy and monthly content calendar</li>
<li>Post and Reel design, copywriting and hashtag research</li>
<li>Video editing and UGC-style content</li>
<li>Paid campaigns on Meta (Instagram + Facebook), LinkedIn and YouTube</li>
<li>Audience targeting, retargeting and lookalike audiences</li>
<li>Community management and comment/DM responses</li>
<li>Monthly analytics report: reach, engagement, leads and cost per result</li>
</ul>

<h2>Organic + Paid = Growth</h2>
<p>Organic content builds trust; paid ads build reach. We run both together. Your best-performing organic posts become ads, and ad insights shape your content. The result is a lower cost per lead and a brand people recognise.</p>

<h2>Built for Indian and Global Audiences</h2>
<p>We create content in English, Hindi and Hinglish for Indian audiences, and run campaigns targeting international markets for export and SaaS businesses.</p>
""",
        "faqs": [
            ("Which platform is best for my business?", "B2C brands usually grow fastest on Instagram and YouTube. B2B companies see the best leads on LinkedIn. We recommend a mix based on your audience."),
            ("How many posts do you create per month?", "It depends on your plan. We'll propose a calendar that matches your goals and budget."),
            ("Is the ad budget included in your fee?", "No. Ad spend is paid directly to the platform. Our fee covers strategy, creatives and management."),
            ("How soon will I see results?", "Paid campaigns can generate leads within days. Organic growth builds over 2–3 months of consistent posting."),
        ],
    },
    "ecommerce-development": {
        "new_slug": "ecommerce-development",
        "name": "E-Commerce Development",
        "icon_key": "shopping-cart",
        "short_desc": "Scalable online stores with UPI and card payments, inventory, order management and a powerful admin panel. Custom, Shopify and headless commerce.",
        "features": ["UPI & Cards", "Inventory", "Admin Panel", "GST Invoicing", "Shipping Integration"],
        "meta_title": "E-Commerce Website Development Company | Neighshop Global",
        "meta_description": "Scalable online stores with UPI and card payments, inventory, order management and a powerful admin panel. Custom, Shopify and headless e-commerce. Get a quote.",
        "html": """
<p>Selling online in India is booming, and customers expect a fast, mobile-first, frictionless checkout. Neighshop Global builds e-commerce stores and marketplaces that load quickly, look premium, and handle payments, inventory and orders without headaches, whether you're a new D2C brand or an established retailer moving online.</p>

<h2>E-Commerce Solutions We Build</h2>
<ul>
<li><strong>D2C brand stores:</strong> Beautiful, story-led storefronts for fashion, beauty, wellness, food and lifestyle brands.</li>
<li><strong>Custom e-commerce platforms:</strong> Built from scratch with Next.js and Node.js when you need full control and unique features.</li>
<li><strong>Shopify stores:</strong> Fast launches with custom themes, apps and integrations.</li>
<li><strong>Headless commerce:</strong> A blazing-fast Next.js frontend connected to a commerce backend.</li>
<li><strong>Multi-vendor marketplaces:</strong> Seller onboarding, commissions, payouts and vendor dashboards.</li>
<li><strong>Quick-commerce &amp; grocery apps:</strong> Hyperlocal inventory, slot booking and rapid delivery tracking.</li>
<li><strong>B2B e-commerce:</strong> Bulk pricing, quotes, credit terms and distributor portals.</li>
</ul>

<h2>Features That Drive Sales</h2>
<ul>
<li><strong>Payments:</strong> UPI, cards, net banking, wallets, EMI and Cash on Delivery via Razorpay, PayU, Cashfree, Stripe and more.</li>
<li><strong>Inventory:</strong> Real-time stock, variants (size/colour), multi-warehouse support, low-stock alerts.</li>
<li><strong>Admin panel:</strong> Products, orders, customers, coupons, returns and reports in one dashboard.</li>
<li><strong>Shipping integration:</strong> Shiprocket, Delhivery and other aggregators for automated shipping labels and tracking.</li>
<li><strong>Marketing tools:</strong> Coupons, abandoned-cart recovery, WhatsApp notifications, reviews, loyalty points.</li>
<li><strong>SEO &amp; speed:</strong> Product schema, clean URLs, optimised images, Core Web Vitals.</li>
<li><strong>GST invoicing:</strong> Automatic GST-compliant invoices.</li>
</ul>

<h2>Shopify or Custom?</h2>
<p>Shopify is excellent for fast launches and standard catalogues. Custom development wins when you need unique workflows, marketplace features, or want to avoid recurring app and transaction fees as you scale. We'll recommend honestly.</p>

<h2>E-Commerce Project Experience</h2>
<p>Our portfolio includes e-commerce concept and reference builds across medical apparel, fashion retail, brand storefronts, product catalogues and resale marketplaces.</p>
""",
        "faqs": [
            ("How long does it take to build an e-commerce website?", "A Shopify store can launch in 2–4 weeks. Custom platforms and marketplaces take a few months."),
            ("Which payment gateways do you integrate?", "Razorpay, PayU, Cashfree, PhonePe, Stripe, PayPal and others, including UPI and COD."),
            ("Can you add a mobile app for my store?", "Yes. We build Android and iOS shopping apps connected to the same backend."),
            ("Will my store be SEO-friendly?", "Yes. Every store ships with SEO-ready structure, product schema and fast page loads."),
            ("Can you migrate my store from WooCommerce or another platform?", "Yes, including products, customers and orders, with redirects to protect rankings."),
        ],
    },
    "graphic-design-branding": {
        "new_slug": "graphic-design-branding",
        "name": "Graphic Design & Branding",
        "icon_key": "palette",
        "short_desc": "Brand identity, UI/UX, social creatives and print collateral that make you look as good as you are.",
        "features": ["Brand Identity", "UI/UX", "Social Creatives", "Brochures", "Pitch Decks"],
        "meta_title": "Branding & Graphic Design Agency in Delhi | Neighshop Global",
        "meta_description": "Logo and brand identity design, UI/UX, social media creatives and brochures that make your business memorable. Strategic design by Neighshop Global, Delhi.",
        "html": """
<p>People judge a business in seconds, and design is what they judge. A strong brand identity builds trust before you say a word, lets you charge what you're worth, and makes every marketing rupee work harder. Neighshop Global creates brand systems, digital interfaces and marketing materials that look consistent everywhere your customers see you.</p>

<h2>Design Services</h2>
<ul>
<li><strong>Brand identity:</strong> Logo, colour palette, typography, brand voice and a complete brand guidelines document.</li>
<li><strong>UI/UX design:</strong> Wireframes, user flows and high-fidelity designs for websites and apps, with Figma prototypes you can click through.</li>
<li><strong>Social media creatives:</strong> Post templates, carousels, Reel covers, ad creatives and festive campaigns.</li>
<li><strong>Brochures &amp; print:</strong> Company profiles, brochures, catalogues, flyers, business cards and packaging.</li>
<li><strong>Pitch decks:</strong> Investor and sales presentations that tell your story clearly.</li>
</ul>

<h2>Our Branding Process</h2>
<ol>
<li><strong>Brand discovery:</strong> Your audience, competitors, values and personality.</li>
<li><strong>Concepts:</strong> Multiple creative directions with rationale.</li>
<li><strong>Refinement:</strong> Revisions based on your feedback.</li>
<li><strong>Brand system:</strong> Final logo files and guidelines for every use case.</li>
<li><strong>Rollout:</strong> Applying the brand across website, social media and print.</li>
</ol>

<h2>Design That Connects to Development</h2>
<p>Because our designers sit next to our developers, the UI you approve is the UI that ships. There's no "the developer couldn't build that" surprise. That's a big advantage when you need branding, a website and an app together.</p>
""",
        "faqs": [
            ("What files will I receive?", "Source files (AI/Figma), plus PNG, SVG, PDF and JPG versions for web and print."),
            ("How long does a brand identity take?", "Typically 2–4 weeks, depending on scope and feedback cycles."),
            ("Can you redesign our existing logo?", "Yes. We can refresh or fully rebrand while keeping the recognition you've built."),
            ("Do you design for apps and websites too?", "Yes. UI/UX design is a core part of our design service."),
        ],
    },
    "video-editing-ugc": {
        "new_slug": "video-editing-ugc",
        "name": "Video Editing & UGC",
        "icon_key": "video",
        "short_desc": "Reels, YouTube edits, ad creatives and UGC-style videos built with strong hooks, fast pacing and captions, engineered to stop the scroll.",
        "features": ["Ad Creatives", "UGC Content", "Reels & Shorts", "Motion Graphics", "Captions"],
        "meta_title": "Video Editing & UGC Content Services | Neighshop Global",
        "meta_description": "Scroll-stopping Reels, YouTube edits, ad creatives and UGC videos for brands. Hooks, captions and motion graphics built for performance. Get a video quote.",
        "html": """
<p>Short-form video is the most powerful format in marketing today. On Instagram Reels, YouTube Shorts and in ads, the first three seconds decide everything. Neighshop Global edits and produces videos engineered for attention: strong hooks, fast pacing, captions for sound-off viewing, and clear calls to action.</p>

<h2>What We Create</h2>
<ul>
<li><strong>Ad creatives:</strong> Performance video ads for Meta, YouTube and Google, with multiple hooks for A/B testing.</li>
<li><strong>UGC content:</strong> Authentic, creator-style videos (unboxings, testimonials-style scripts, product demos, problem–solution) that feel native to the feed.</li>
<li><strong>Instagram Reels &amp; YouTube Shorts:</strong> Trend-aware short-form edits for consistent posting.</li>
<li><strong>YouTube long-form editing:</strong> Podcasts, tutorials, vlogs and brand films with B-roll, graphics and chapters.</li>
<li><strong>Motion graphics:</strong> Animated logos, explainer animations, text animations and lower thirds.</li>
<li><strong>Product videos:</strong> E-commerce listing videos and launch teasers.</li>
</ul>

<h2>Why UGC Works</h2>
<p>Viewers trust people more than polished ads. UGC-style creatives often outperform studio ads because they feel like a recommendation from a real person. We script, source and edit UGC that fits your brand while following advertising disclosure norms. UGC should use real creators and genuine experiences; we never fabricate customer testimonials.</p>

<h2>Our Video Workflow</h2>
<p>Brief &amp; script → Footage (yours, creator-shot or stock) → First edit → Feedback → Final export in every format (9:16, 1:1, 16:9) with captions.</p>
""",
        "faqs": [
            ("Do you shoot videos or only edit?", "We edit your footage and can coordinate UGC creators."),
            ("What's the turnaround time?", "Short-form edits are typically delivered within a few working days, depending on volume."),
            ("Do you add subtitles?", "Yes. Captions are standard because most social video is watched without sound."),
            ("Can you edit in Hindi and regional languages?", "Yes, Hindi and English (including Hinglish) captions and edits."),
        ],
    },
    "landing-page-design": {
        "new_slug": "landing-page-design",
        "name": "Landing Page Design",
        "icon_key": "layout-template",
        "short_desc": "Fast-loading, A/B-ready landing pages for lead generation and product launches, with conversion-focused copy that lowers your cost per lead.",
        "features": ["Lead Generation", "A/B Ready", "Fast Loading", "Smart Forms", "Conversion Tracking"],
        "meta_title": "High-Converting Landing Page Design | Neighshop Global",
        "meta_description": "Fast-loading, A/B-ready landing pages for lead generation, ad campaigns and product launches. Conversion-focused copy and design that lowers your cost per lead.",
        "html": """
<p>You're paying for every ad click, so the page those clicks land on had better convert. Neighshop Global designs landing pages with a single goal: get the visitor to take action. Clear headlines, persuasive copy, social proof, fast load times and frictionless forms. The result is more leads from the same ad budget.</p>

<h2>Landing Pages We Build</h2>
<ul>
<li><strong>Lead generation pages:</strong> For services, real estate, education, healthcare and B2B.</li>
<li><strong>Product launch pages:</strong> Waitlists, pre-orders and launch countdowns.</li>
<li><strong>Ad campaign pages:</strong> Message-matched to your Google, Meta and LinkedIn ads.</li>
<li><strong>Webinar &amp; event pages:</strong> Registration flows with automated reminders.</li>
<li><strong>App download pages:</strong> Drive installs from Play Store and App Store.</li>
</ul>

<h2>What Makes Our Landing Pages Convert</h2>
<ul>
<li><strong>Lead generation focus:</strong> One page, one goal, one clear CTA.</li>
<li><strong>Fast loading:</strong> Built to load in under two seconds on mobile, because every second of delay costs conversions.</li>
<li><strong>A/B ready:</strong> Built for testing headlines, offers and layouts.</li>
<li><strong>Message match:</strong> Your ad promise and your headline say the same thing.</li>
<li><strong>Trust elements:</strong> Real reviews, certifications, guarantees and FAQs. Only genuine proof.</li>
<li><strong>Smart forms:</strong> Minimal fields, WhatsApp click-to-chat, instant lead alerts to your CRM.</li>
<li><strong>Tracking:</strong> GA4, Meta Pixel, Conversions API and Google Ads conversion tracking.</li>
</ul>

<h2>Our Process</h2>
<p>Offer &amp; audience research → Copywriting → Design → Build → Tracking setup → Launch → A/B test and optimise.</p>
""",
        "faqs": [
            ("How fast can you build a landing page?", "Usually within 1–2 weeks, depending on copy and design requirements."),
            ("Do you write the copy?", "Yes. Conversion copywriting is included in our landing page service."),
            ("Can you connect the form to my CRM?", "Yes, including our custom CRMs, Zoho, HubSpot, Google Sheets, email and WhatsApp."),
            ("Do you run the ads too?", "Yes. Our social media and performance marketing team can manage campaigns end to end."),
        ],
    },
}


def run():
    with app.app_context():
        updated, missed = [], []
        for old_slug, data in SERVICES.items():
            s = Service.query.filter_by(slug=old_slug).first()
            if not s:
                missed.append(old_slug)
                continue
            s.slug = data["new_slug"]
            s.name = data["name"]
            s.icon_key = data["icon_key"]
            s.short_desc = data["short_desc"]
            s.features = data["features"]
            s.meta_title = data["meta_title"]
            s.meta_description = data["meta_description"]
            s.long_content_html = data["html"].strip()

            Faq.query.filter_by(service_id=s.id).delete()
            for i, (q, a) in enumerate(data["faqs"]):
                db.session.add(Faq(question=q, answer=a, display_order=i, is_global=False, service_id=s.id, category="service"))

            updated.append(data["new_slug"])
        db.session.commit()
        print("Updated:", updated)
        print("Missed:", missed)


if __name__ == "__main__":
    run()
