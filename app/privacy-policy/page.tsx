import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';
import RoyalScrollLayout from '@/components/RoyalScrollLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Chill Co.',
  description: 'Official Privacy Policy of Chill Co. Read our comprehensive data protection policies, payment security standards, and privacy rights.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction & Data Controller',
      subTitle: 'Scope and Organizational Commitment',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            Welcome to <strong style={{ color: '#c9a96e' }}>Chill Co. Apparel Enterprises</strong> (&quot;Chill Co.,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We respect your privacy and are committed to protecting your personal data in strict compliance with applicable laws, including the <strong style={{ color: '#ffe8b5' }}>Sri Lanka Personal Data Protection Act No. 9 of 2022 (PDPA)</strong> and international data privacy standards (GDPR).
          </p>
          <p style={{ marginBottom: '1rem' }}>
            This Privacy Policy governs your use of our website (<a href="https://chillco.store" style={{ color: '#c9a96e' }}>chillco.store</a>), online shop, checkout services, and custom apparel printing studio. By accessing our services or purchasing products from Chill Co., you acknowledge that you have read and agreed to the practices described herein.
          </p>
          <div style={{ padding: '1rem', background: 'rgba(20,13,8,0.6)', borderLeft: '2px solid #7d5b31', fontSize: '0.85rem' }}>
            <strong style={{ color: '#c9a96e', display: 'block', marginBottom: '0.3rem' }}>Data Controller & Merchant Identity:</strong>
            Merchant Name: Chill Co. Apparel Enterprises<br />
            Registered Operating Address: Colombo, Western Province, Sri Lanka<br />
            Official Contact Email: <a href="mailto:contact@chillco.store" style={{ color: '#ffe8b5' }}>contact@chillco.store</a>
          </div>
        </>
      ),
    },
    {
      id: 'data-collected',
      title: 'Information We Collect',
      subTitle: 'Personal Data and Technical Identifiers',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            We collect personal information necessary to deliver products, fulfill custom print orders, process transactions securely, and manage customer accounts.
          </p>
          
          <h4 style={{ color: '#c9a96e', fontWeight: 600, fontSize: '0.95rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>
            1. Directly Provided Information:
          </h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffe8b5' }}>Identity & Contact Data:</strong> Customer full name, email address, telephone contact number, shipping destination, and billing address.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffe8b5' }}>Order & Transaction History:</strong> Garment purchases, size selections, invoice details, and delivery instructions.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffe8b5' }}>Custom Print Studio Uploads:</strong> Artwork files, graphics, logos, and custom print design instructions.
            </li>
            <li>
              <strong style={{ color: '#ffe8b5' }}>Account Credentials:</strong> Passwords and profile details authenticated securely.
            </li>
          </ul>

          <h4 style={{ color: '#c9a96e', fontWeight: 600, fontSize: '0.95rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>
            2. Automatically Collected Technical Data:
          </h4>
          <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffe8b5' }}>Device & Session Sigils:</strong> IP address, browser type and version, time zone setting, operating system, and hardware model.
            </li>
            <li>
              <strong style={{ color: '#ffe8b5' }}>Site Telemetry:</strong> Pages visited, checkout funnel steps, clickstream data, and session durations.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'payment-data-security',
      title: 'Payment Data Handling & Card Security',
      subTitle: 'PCI-DSS Compliance and Card Protection',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            Chill Co. prioritizes customer transaction security and enforces strict financial data controls:
          </p>
          <div style={{ backgroundColor: 'rgba(20,13,8,0.7)', border: '1px solid #7d5b31', padding: '1.25rem', marginBottom: '1rem' }}>
            <ul style={{ paddingLeft: '1.25rem', listStyleType: 'circle', fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ffe8b5' }}>Direct Gateway Redirection / iFrame:</strong> Credit and debit card details entered during checkout are submitted directly to PCI-DSS Level 1 certified Payment Gateway acquirers over 256-bit SSL encrypted connections.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ffe8b5' }}>Zero Storage Guarantee:</strong> Full payment card numbers, CVVs, expiration dates, and card PINs are <strong style={{ color: '#c9a96e' }}>NEVER stored, logged, or retained</strong> on Chill Co. servers.
              </li>
              <li>
                <strong style={{ color: '#ffe8b5' }}>Tokenized Processing:</strong> Gateway partners return only an encrypted transaction authorization token used to record payment status for your order invoice.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Third-Party Service Providers',
      subTitle: 'Disclosure Protocols & Non-Sale Guarantee',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#ffe8b5' }}>WE DO NOT SELL, RENT, OR TRADE YOUR PERSONAL DATA TO THIRD PARTIES.</strong> Information is shared solely with vetted service providers necessary to operate our business:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#c9a96e' }}>Licensed Payment Gateways:</strong> Acquirers and banking institutions processing online card payments.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#c9a96e' }}>Database & Cloud Hosts (Supabase Inc.):</strong> Secure cloud database storage with row-level security policy controls.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#c9a96e' }}>Logistics & Courier Guilds:</strong> Third-party delivery providers receiving only your name, phone number, and delivery address.
            </li>
            <li>
              <strong style={{ color: '#c9a96e' }}>Legal Requirements:</strong> Disclosures mandated by Sri Lankan courts or law enforcement statutory authorities.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'custom-print-privacy',
      title: 'Custom Print Artwork Confidentiality',
      subTitle: 'Protection of User-Uploaded Artwork',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            Graphics and logos uploaded to our Custom Print Studio remain your intellectual property. Uploaded artwork is used <strong style={{ color: '#ffe8b5' }}>solely for printing and fulfilling your specific order</strong> and will never be resold or publicly displayed without your written consent.
          </p>
        </>
      ),
    },
    {
      id: 'retention-and-rights',
      title: 'Data Retention & Customer Rights',
      subTitle: 'Retention SLA and Data Rights under PDPA',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            We retain order and transaction records for a minimum of 6 years in accordance with Sri Lankan tax and commercial accounting laws. Customers possess the right to access, correct, or request deletion of their personal data by contacting <a href="mailto:contact@chillco.store" style={{ color: '#c9a96e' }}>contact@chillco.store</a>.
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking Technologies',
      subTitle: 'Browser Storage and Preferences',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            We use essential cookies and local storage to preserve active shopping cart items, keep users logged in, and analyze performance. You may disable non-essential cookies in browser settings.
          </p>
        </>
      ),
    },
    {
      id: 'contact-us',
      title: 'Contact Information',
      subTitle: 'Reaching Our Support & Legal Team',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            For privacy queries, data requests, or compliance inquiries, please contact us at:
          </p>
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'rgba(20,13,8,0.8)',
              border: '1px solid #7d5b31',
              fontSize: '0.85rem',
            }}
          >
            <strong style={{ color: '#c9a96e' }}>Merchant Name:</strong> Chill Co. Apparel Enterprises<br />
            <strong style={{ color: '#c9a96e' }}>Registered Address:</strong> Colombo, Western Province, Sri Lanka<br />
            <strong style={{ color: '#c9a96e' }}>Contact Email:</strong> <a href="mailto:contact@chillco.store" style={{ color: '#ffe8b5' }}>contact@chillco.store</a><br />
            <strong style={{ color: '#c9a96e' }}>Website:</strong> <a href="https://chillco.store" style={{ color: '#ffe8b5' }}>https://chillco.store</a>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <TopNavBar />
      <RoyalScrollLayout
        activeTab="privacy"
        title="Privacy Policy"
        subtitle="CHILL CO. DATA PROTECTION & PAYMENT PRIVACY STANDARDS"
        effectiveDate="AUGUST 3, 2026"
        sections={sections}
      />
      <Footer />
    </>
  );
}
