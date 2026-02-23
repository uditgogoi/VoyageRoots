<script>
  import { onMount } from 'svelte';

  const lastUpdated = 'February 2025';
  let activeSection = $state('acceptance');

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing or using VoyageRoots ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all visitors, users, travelers, and operators.`
    },
    {
      id: 'accounts',
      title: 'Accounts & Registration',
      content: `You must register for an account to book experiences or list services on VoyageRoots. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years of age to create an account.`
    },
    {
      id: 'travelers',
      title: 'Traveler Responsibilities',
      content: `As a traveler using VoyageRoots, you agree to:\n\n• Provide accurate personal information when making bookings\n• Ensure all members of your group meet the prerequisites listed for each experience\n• Arrive on time and prepared with required documents, gear, and fitness level\n• Respect the local environment, culture, and other participants\n• Follow all safety instructions provided by the operator and guide\n• Obtain appropriate travel insurance before participating in any experience\n\nVoyageRoots is not liable for injuries, losses, or damages arising from failure to comply with experience requirements.`
    },
    {
      id: 'operators',
      title: 'Operator Responsibilities',
      content: `As an operator listing experiences on VoyageRoots, you agree to:\n\n• Provide accurate, honest descriptions of all experiences\n• Maintain all necessary licenses, permits, and certifications required by law\n• Ensure the safety and wellbeing of all participants\n• Honor all confirmed bookings unless cancelled under valid circumstances\n• Respond to traveler inquiries within 24 hours\n• Not engage in price manipulation or false advertising\n\nVoyageRoots reserves the right to remove operator listings that violate these terms.`
    },
    {
      id: 'bookings',
      title: 'Bookings & Payments',
      content: `All bookings are subject to availability and operator confirmation. Payment is processed securely via Stripe. By making a payment, you authorize VoyageRoots to charge the stated amount to your selected payment method.\n\nVoyageRoots charges a platform service fee on each booking. This fee is non-refundable unless the experience is cancelled by the operator.`
    },
    {
      id: 'cancellations',
      title: 'Cancellations & Refunds',
      content: `Cancellation policies vary by experience and are set by the operator.\n\nGeneral guidelines:\n• Cancellation 14+ days before: Full refund minus platform fee\n• Cancellation 7–14 days before: 50% refund\n• Cancellation less than 7 days: No refund unless operator cancels\n\nIf an operator cancels an experience, travelers will receive a full refund including the platform fee.`
    },
    {
      id: 'conduct',
      title: 'Prohibited Conduct',
      content: `You agree not to:\n\n• Use the platform for any unlawful purpose\n• Harass, abuse, or harm other users or operators\n• Post false, misleading, or fraudulent reviews or listings\n• Attempt to circumvent the platform by booking directly with operators\n• Scrape or redistribute platform content without permission\n\nViolation of these rules may result in immediate account suspension or termination.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: `VoyageRoots is a marketplace connecting travelers with third-party operators. We do not directly operate or lead any experiences. While we vet operators, VoyageRoots is not responsible for personal injury, property damage, acts of nature, or actions of third-party operators.\n\nTo the maximum extent permitted by law, VoyageRoots' liability is limited to the amount paid for the booking in question.`
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      content: `All content on VoyageRoots including logos, design, text, and software is the property of VoyageRoots or its licensors. You may not copy, reproduce, or distribute any platform content without prior written permission.\n\nBy uploading content as an operator, you grant VoyageRoots a non-exclusive, royalty-free license to use and display that content on the platform.`
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      content: `VoyageRoots reserves the right to modify these Terms of Service at any time. We will notify registered users of significant changes via email or in-app notification. Continued use of the platform after changes constitutes acceptance of the updated terms.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: `If you have questions about these Terms of Service, please contact us:\n\nEmail: legal@voyageroots.in\n\nWe aim to respond to all legal inquiries within 5 business days.`
    },
  ];

  onMount(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY + 120; // offset for navbar

    let current = sections[0].id;

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= scrollY) {
        current = s.id;
      }
    });

    activeSection = current;
  };

  // Set first section active on load
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
      <span>Terms of Service</span>
    </div>
    <h1 class="text-3xl font-bold text-base-content mb-1"
      style="font-family: 'Clash Display', sans-serif;">
      Terms of Service
    </h1>
    <p class="text-sm text-base-content/50">Last updated: {lastUpdated}</p>
  </div>
</div>

<!-- Main layout: sidebar + content -->
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
    <div class="flex flex-col gap-10 min-w-0">

      <!-- Intro box -->
      <div class="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-sm text-base-content/70 leading-relaxed">
        Please read these terms carefully before using VoyageRoots. They govern your use of our platform as a traveler or operator and outline your rights and responsibilities.
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
        These terms were last updated in {lastUpdated}. By continuing to use VoyageRoots, you acknowledge that you have read and understood these Terms of Service.
      </div>

      <div class="flex gap-3">
        <a href="/privacy" class="btn btn-outline btn-sm rounded-lg text-xs">Privacy Policy</a>
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