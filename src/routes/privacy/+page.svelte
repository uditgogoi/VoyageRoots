<script>
  import { onMount } from 'svelte';

  const lastUpdated = 'February 2025';
  let activeSection = $state('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: `VoyageRoots ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your information when you use our platform.\n\nBy using VoyageRoots, you agree to the collection and use of information as described in this policy.`
    },
    {
      id: 'data-collected',
      title: 'Data We Collect',
      content: `We collect the following types of information:\n\nAccount Information\n• Full name, email address, and password when you register\n• Profile photo (optional)\n• Phone number (optional)\n• Role — traveler or operator\n\nBooking Information\n• Experience selections, dates, and group size\n• Names and contact details of group members\n• Payment details (processed securely via Stripe — we do not store card numbers)\n\nUsage Information\n• Pages visited and time spent on the platform\n• Search queries and filters used\n• Device type, browser, and IP address\n• Clicks and interactions within the platform\n\nOperator Information\n• Business name, description, and experience listings\n• Images and documents uploaded to the platform\n• Banking details for payouts (stored securely via Stripe)`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Data',
      content: `We use your data to:\n\n• Create and manage your account\n• Process bookings and payments\n• Send booking confirmations, reminders, and receipts\n• Connect travelers with operators\n• Improve platform features and user experience\n• Send marketing communications (only with your consent)\n• Detect and prevent fraud or misuse\n• Comply with legal obligations\n\nWe do not sell your personal data to third parties.`
    },
    {
      id: 'sharing',
      title: 'Data Sharing',
      content: `We share your data only in the following circumstances:\n\nWith Operators\nWhen you book an experience, relevant booking details (name, contact, group size) are shared with the operator to fulfill your booking.\n\nWith Service Providers\nWe use trusted third-party services including:\n• Stripe — payment processing\n• Supabase — database and authentication\n• Vercel — platform hosting\n\nThese providers are bound by data processing agreements and may not use your data for their own purposes.\n\nLegal Requirements\nWe may disclose your information if required by law, court order, or to protect the rights and safety of our users.`
    },
    {
      id: 'cookies',
      title: 'Cookies',
      content: `We use cookies and similar technologies to:\n\n• Keep you logged in across sessions\n• Remember your preferences\n• Analyse platform usage (via anonymous analytics)\n\nTypes of cookies we use:\n• Essential cookies — required for the platform to function\n• Analytics cookies — help us understand how users interact with the platform\n• Preference cookies — remember your settings\n\nYou can control cookies through your browser settings. Disabling essential cookies may affect platform functionality.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: `We retain your data for as long as your account is active or as needed to provide services.\n\n• Account data is retained until you delete your account\n• Booking records are retained for 7 years for legal and tax purposes\n• Analytics data is retained for 24 months\n• Inactive accounts may be deleted after 2 years of inactivity with prior notice\n\nYou may request deletion of your account and associated data at any time.`
    },
    {
      id: 'rights',
      title: 'Your Rights',
      content: `You have the following rights regarding your personal data:\n\n• Access — request a copy of the data we hold about you\n• Correction — request correction of inaccurate data\n• Deletion — request deletion of your account and data\n• Portability — receive your data in a portable format\n• Objection — object to certain uses of your data\n• Withdraw Consent — withdraw marketing consent at any time\n\nTo exercise any of these rights, contact us at privacy@voyageroots.in. We will respond within 30 days.`
    },
    {
      id: 'security',
      title: 'Data Security',
      content: `We take data security seriously and implement industry-standard measures including:\n\n• HTTPS encryption for all data in transit\n• Encrypted storage of sensitive data\n• Row-level security policies on our database\n• Regular security audits\n• Restricted employee access to personal data\n\nWhile we take every precaution, no system is completely secure. We encourage you to use a strong, unique password and to contact us immediately if you suspect unauthorized access to your account.`
    },
    {
      id: 'children',
      title: "Children's Privacy",
      content: `VoyageRoots is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from minors.\n\nIf you believe a minor has created an account on our platform, please contact us at privacy@voyageroots.in and we will promptly delete the account and associated data.`
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      content: `We may update this Privacy Policy from time to time. When we make significant changes, we will notify you via email or a prominent notice on the platform.\n\nWe encourage you to review this policy periodically. Your continued use of VoyageRoots after any changes constitutes acceptance of the updated policy.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: `For any privacy-related questions, requests, or concerns, please contact us:\n\nEmail: privacy@voyageroots.in\nResponse time: Within 5 business days\n\nFor data deletion requests or to exercise your rights, email us with the subject line "Privacy Request" and we will process your request promptly.`
    },
  ];

  onMount(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      let current = sections[0].id;
      sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) current = s.id;
      });
      activeSection = current;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<!-- Header -->
<div class="bg-base-200 border-b border-base-300 py-10 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center gap-2 text-xs text-base-content/40 mb-3">
      <a href="/" class="hover:text-primary transition-colors">Home</a>
      <span>/</span>
      <span>Privacy Policy</span>
    </div>
    <h1 class="text-3xl font-bold text-base-content mb-1"
      style="font-family: 'Clash Display', sans-serif;">
      Privacy Policy
    </h1>
    <p class="text-sm text-base-content/50">Last updated: {lastUpdated}</p>
  </div>
</div>

<!-- Main layout -->
<div class="max-w-6xl mx-auto px-4 py-10">
  <div style="display: grid; grid-template-columns: 220px 1fr; gap: 2.5rem; align-items: start;">

    <!-- LEFT SIDEBAR -->
    <div style="position: sticky; top: 80px;">
      <p class="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-3">Contents</p>
      <nav class="flex flex-col gap-0.5">
        {#each sections as section}
          <a
            href="#{section.id}"
            class="block text-sm px-3 py-2 rounded-lg transition-colors no-underline
              {activeSection === section.id
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-base-content/50 hover:text-base-content hover:bg-base-200'}"
          >
            {section.title}
          </a>
        {/each}
      </nav>
    </div>

    <!-- RIGHT CONTENT -->
    <div class="flex flex-col gap-10 min-w-0 pb-96">

      <!-- Intro box -->
      <div class="bg-secondary/5 border border-secondary/20 rounded-2xl p-5 text-sm text-base-content/70 leading-relaxed">
        Your privacy matters to us. This policy explains clearly and honestly how VoyageRoots handles your personal data — what we collect, why we collect it, and how you can control it.
      </div>

      <!-- Sections -->
      {#each sections as section}
        <div id={section.id} class="scroll-mt-24">
          <h2 class="text-lg font-semibold text-base-content mb-3"
            style="font-family: 'Clash Display', sans-serif;">
            {section.title}
          </h2>
          <p class="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
          <div class="mt-8 border-b border-base-200"></div>
        </div>
      {/each}

      <!-- Footer note -->
      <div class="bg-base-200 rounded-2xl p-5 text-xs text-base-content/50 leading-relaxed">
        This Privacy Policy was last updated in {lastUpdated}. By continuing to use VoyageRoots, you acknowledge that you have read and understood this policy.
      </div>

      <div class="flex gap-3">
        <a href="/terms" class="btn btn-outline btn-sm rounded-lg text-xs">Terms of Service</a>
        <a href="/refunds" class="btn btn-outline btn-sm rounded-lg text-xs">Refund Policy</a>
        <a href="/contact" class="btn btn-outline btn-sm rounded-lg text-xs">Contact Us</a>
      </div>

    </div>
  </div>
</div>

<style>
  @media (max-width: 768px) {
    div[style*="grid-template-columns"] {
      display: flex !important;
      flex-direction: column;
    }
    div[style*="position: sticky"] {
      position: static !important;
    }
  }
</style>