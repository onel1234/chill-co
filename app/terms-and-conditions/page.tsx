import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';
import RoyalScrollLayout from '@/components/RoyalScrollLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Chill Co.',
  description: 'Official Terms & Conditions of Chill Co. Read our merchant terms, payment security, delivery SLA, cancellation, and refund policies.',
};

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: 'agreement-to-terms',
      title: 'Agreement & Merchant Information',
      subTitle: 'Legal Contract & Business Identity',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            These Terms & Conditions (&quot;Terms&quot;) constitute a legally binding contract between you (&quot;User,&quot; &quot;Customer,&quot; or &quot;You&quot;) and <strong style={{ color: '#c9a96e' }}>Chill Co. Apparel Enterprises</strong> (&quot;Chill Co.,&quot; &quot;Company,&quot; &quot;We,&quot; or &quot;Us&quot;), governing your access to and purchases on our website <a href="https://chillco.store" style={{ color: '#c9a96e' }}>chillco.store</a>.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Chill Co. is a registered apparel merchant operating under the commercial laws of the Democratic Socialist Republic of Sri Lanka, headquartered in Colombo, Western Province.
          </p>
          <p>
            By browsing our website, registering an account, or placing an order, you confirm that you are at least 18 years of age (or browsing under parental supervision) and agree to be bound by these Terms and our Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: 'products-custom-prints',
      title: 'Products & Custom Print Atelier',
      subTitle: 'Product Specs, Availability & Graphic Rights',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            Chill Co. offers ready-to-wear oversized apparel, essential garments, accessories, and custom textile printing services.
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#c9a96e' }}>Product Representation:</strong> We display fabric textures, colors, and sizing as accurately as possible. Minor color variations may occur due to device display settings and studio lighting.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#c9a96e' }}>Stock Availability:</strong> Products are subject to stock availability. In the rare event an item becomes unavailable after payment, we will notify you immediately and issue a full prompt refund.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#c9a96e' }}>Custom Print Artwork Guarantees:</strong> Customers uploading designs to our Custom Print Studio warrant that they possess all legal copyrights and intellectual property rights for the graphics submitted.
            </li>
            <li>
              <strong style={{ color: '#c9a96e' }}>Right of Refusal:</strong> We reserve the right to decline custom print orders containing illegal, defamatory, hate speech, or trademark-infringing content.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'pricing-payment-security',
      title: 'Pricing, Payments & Security Protocols',
      subTitle: 'Currency, Card Security & Encryption Declarations',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            All prices listed on Chill Co. are denominated in <strong style={{ color: '#c9a96e' }}>Sri Lankan Rupees (LKR)</strong> and are inclusive of applicable taxes.
          </p>
          <div style={{ backgroundColor: 'rgba(20,13,8,0.7)', border: '1px solid #7d5b31', padding: '1.25rem', marginBottom: '1rem' }}>
            <h4 style={{ color: '#ffe8b5', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Online Payment & Card Security Assurance:
            </h4>
            <ul style={{ paddingLeft: '1.25rem', listStyleType: 'circle', fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#c9a96e' }}>Accepted Cards:</strong> We accept Visa, Mastercard, and bank debit/credit cards, as well as Cash on Delivery (COD) for eligible domestic zones.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#c9a96e' }}>256-Bit SSL Encryption:</strong> All card transactions are processed through licensed, PCI-DSS compliant Payment Gateway partners utilizing 256-bit SSL encryption and 3D-Secure authentication.
              </li>
              <li>
                <strong style={{ color: '#c9a96e' }}>No Sensitive Card Data Stored:</strong> Chill Co. does NOT store, capture, or retain full credit/debit card numbers, CVVs, or card PINs on its servers.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: 'cancellation-policy',
      title: 'Order Cancellation Policy',
      subTitle: 'Pre-Dispatch Cancellation & Procedure',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            We understand plans change. Customers may cancel an order subject to the following conditions:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffe8b5' }}>Cancellation Window:</strong> Orders can be cancelled free of charge within <strong style={{ color: '#c9a96e' }}>24 hours of placement</strong> or before the item has been dispatched by emailing <a href="mailto:contact@chillco.store" style={{ color: '#ffe8b5' }}>contact@chillco.store</a> with your Order ID.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffe8b5' }}>Pre-Dispatch Refund:</strong> If an order is cancelled prior to dispatch, a 100% full refund will be initiated back to your original payment card or bank account within 5 business days.
            </li>
            <li>
              <strong style={{ color: '#ffe8b5' }}>Post-Dispatch Orders:</strong> Once an order has been dispatched or handed over to our courier partner, it cannot be cancelled and falls under our Exchange & Refund Policy.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'shipping-delivery',
      title: 'Shipping, Fulfillment & Delivery SLA',
      subTitle: 'Delivery Timelines, Tracking & Transfer of Risk',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            We ship products island-wide across Sri Lanka via reputable registered courier networks:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(20,13,8,0.6)', borderLeft: '2px solid #7d5b31' }}>
              <strong style={{ color: '#c9a96e', display: 'block', marginBottom: '0.3rem' }}>Western Province Delivery</strong>
              2 to 4 business days SLA for Colombo and Western Province destinations.
            </div>
            <div style={{ padding: '1rem', background: 'rgba(20,13,8,0.6)', borderLeft: '2px solid #7d5b31' }}>
              <strong style={{ color: '#c9a96e', display: 'block', marginBottom: '0.3rem' }}>Outstation Delivery</strong>
              3 to 6 business days SLA for all other island-wide regional destinations.
            </div>
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            A tracking code is dispatched to your email or mobile phone upon courier handoff. Risk of loss and title for products pass to the buyer upon physical delivery to the designated shipping address.
          </p>
        </>
      ),
    },
    {
      id: 'refunds-exchanges',
      title: 'Exchanges, Returns & Refund Policy',
      subTitle: '7-Day Return SLA & Refund Timelines',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            Chill Co. stands behind the quality of its garments. If you are not satisfied with your purchase, our Return and Refund Policy applies:
          </p>
          <div style={{ backgroundColor: 'rgba(20,13,8,0.7)', border: '1px solid rgba(125,91,49,0.3)', padding: '1.25rem', marginBottom: '1rem' }}>
            <ul style={{ paddingLeft: '1.25rem', listStyleType: 'square' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ffe8b5' }}>7-Day Notification SLA:</strong> Return or exchange requests must be lodged within 7 days of delivery by emailing <a href="mailto:contact@chillco.store" style={{ color: '#c9a96e' }}>contact@chillco.store</a>.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ffe8b5' }}>Garment Condition:</strong> Items must be unworn, unwashed, undamaged, with original tags intact.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ffe8b5' }}>Custom Apparel Rule:</strong> Custom printed t-shirts made to personal specifications are non-refundable unless a verified manufacturing or printing defect is proven.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ffe8b5' }}>Refund Processing Window:</strong> Approved refunds for returned items will be credited back to your original payment card or bank account within <strong style={{ color: '#c9a96e' }}>5 to 10 business days</strong>.
              </li>
              <li>
                <strong style={{ color: '#ffe8b5' }}>Defective Goods:</strong> Items arriving damaged or defective will be replaced free of charge or refunded in full, including courier fees.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Protection',
      subTitle: 'Trademarks, Brand Assets & Copyright Laws',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            All logos, brand graphics, garment designs, product photography, typography, and website content on <a href="https://chillco.store" style={{ color: '#c9a96e' }}>chillco.store</a> are the intellectual property of Chill Co. Apparel Enterprises, protected under the <strong style={{ color: '#c9a96e' }}>Intellectual Property Act No. 36 of 2003 of Sri Lanka</strong>.
          </p>
          <p>
            Unauthorized reproduction, copying, or commercial exploitation of brand assets is strictly prohibited.
          </p>
        </>
      ),
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability & Disclaimers',
      subTitle: 'Legal Liability Boundaries',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            To the maximum extent permitted under Sri Lankan law, Chill Co. shall not be liable for indirect, incidental, or consequential damages resulting from site usage or product purchases beyond the total price paid by the customer for the item(s) in question.
          </p>
        </>
      ),
    },
    {
      id: 'governing-law-merchant-contact',
      title: 'Governing Law & Merchant Support',
      subTitle: 'Jurisdiction & Official Contact Details',
      content: (
        <>
          <p style={{ marginBottom: '1rem' }}>
            These Terms & Conditions are governed by and construed in accordance with the <strong style={{ color: '#c9a96e' }}>laws of the Democratic Socialist Republic of Sri Lanka</strong>. Any legal claims or disputes shall be subject to the exclusive jurisdiction of the competent courts in Colombo, Sri Lanka.
          </p>
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'rgba(20,13,8,0.8)',
              border: '1px solid #7d5b31',
              fontSize: '0.85rem',
            }}
          >
            <strong style={{ color: '#c9a96e', display: 'block', marginBottom: '0.3rem' }}>
              Merchant Contact & Customer Support:
            </strong>
            Merchant Legal Name: Chill Co. Apparel Enterprises<br />
            Registered Operating Address: Colombo, Western Province, Sri Lanka<br />
            Official Contact Email: <a href="mailto:contact@chillco.store" style={{ color: '#ffe8b5' }}>contact@chillco.store</a><br />
            Website: <a href="https://chillco.store" style={{ color: '#ffe8b5' }}>https://chillco.store</a>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <TopNavBar />
      <RoyalScrollLayout
        activeTab="terms"
        title="Terms & Conditions"
        subtitle="CHILL CO. MERCHANT TERMS, PAYMENT SECURITY & DELIVERY POLICIES"
        effectiveDate="AUGUST 3, 2026"
        sections={sections}
      />
      <Footer />
    </>
  );
}
