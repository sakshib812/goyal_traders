import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Goyal Traders',
  description:
    'Review the official Terms & Conditions for Goyal Traders governing merchant accounts, API connectivity, wallet balances, and fintech services.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="legal-breadcrumbs">
          <Link href="/#hero">Home</Link>
          <span className="legal-breadcrumb-sep" aria-hidden="true">&rsaquo;</span>
          <span className="legal-breadcrumb-current" aria-current="page">Terms &amp; Conditions</span>
        </nav>

        {/* Page Title & Last Updated (Above Card) */}
        <div className="legal-header">
          <h1 className="legal-page-title">Terms &amp; Conditions</h1>
          <p className="legal-last-updated">Last updated: November 16, 2026</p>
        </div>

        {/* Single White Content Card */}
        <div className="legal-content-card">
          {/* Section 1 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">1. Acceptance of Terms</h2>
            <p className="legal-text">
              These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Partner&rdquo;, &ldquo;Merchant&rdquo;, &ldquo;User&rdquo;, or &ldquo;You&rdquo;)
              and Goyal Traders (&ldquo;Company&rdquo;, &ldquo;We&rdquo;, or &ldquo;Us&rdquo;).
              By accessing our website, creating a merchant profile, acquiring API credentials, integrating our developer SDKs,
              or executing digital payment transactions through our platform, you unconditionally agree to comply with and be bound by these Terms.
            </p>
            <p className="legal-text">
              If you are entering into these Terms on behalf of an entity, corporation, or partnership firm, you represent and warrant that you possess
              the requisite legal authority to bind such entity to these covenants.
            </p>
          </section>

          {/* Section 2 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">2. Description of Services</h2>
            <p className="legal-text">
              Goyal Traders operates as a fintech service switch and technology middleware platform offering:
            </p>
            <ul className="legal-list">
              <li><strong>Mobile Recharge API:</strong> Real-time prepaid mobile balance top-ups across supported Indian telecom operators.</li>
              <li><strong>DTH Recharge:</strong> Set-top box balance renewals with immediate operator confirmations.</li>
              <li><strong>Electricity &amp; Bill Payments:</strong> BBPS-compliant utility bill inquiry, fetching, and remittance pipelines.</li>
              <li><strong>Utility &amp; Fee Payments:</strong> FASTag toll recharges, gas and water billing, and institutional fee settlements.</li>
              <li><strong>Insurance Distribution:</strong> Digital policy issuance and renewal workflows with licensed insurance carriers.</li>
              <li><strong>Dedicated Partner Support:</strong> Technical integration documentation, sandbox testbeds, and operational helpdesks.</li>
            </ul>
            <div className="legal-callout">
              <strong>Regulatory Role:</strong> Goyal Traders serves as a technology platform and technical service provider facilitating integration
              between licensed financial institutions, payment gateways, BBPS operating units, licensed telecom carriers, and downstream merchants.
            </div>
          </section>

          {/* Section 3 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">3. Account Onboarding &amp; Security Obligations</h2>
            <p className="legal-text">
              To utilize our API services, merchants and partners must complete requisite onboarding validations:
            </p>
            <ul className="legal-list">
              <li><strong>KYC &amp; Corporate Verification:</strong> You agree to provide accurate, up-to-date business documentation, including PAN, GST registration, incorporation certificates, and authorized signatory identities as prescribed under Indian banking regulations.</li>
              <li><strong>Credential Confidentiality:</strong> You are solely responsible for maintaining the absolute confidentiality of your API keys, client secrets, and authentication bearer tokens. Any transaction dispatched using your valid API keys shall be deemed authorized by you.</li>
              <li><strong>IP Whitelisting &amp; Velocity Limits:</strong> Partners must configure production IP whitelisting and honor standard request rate limits to safeguard system availability.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">4. Commercial Terms, Balances &amp; Settlement</h2>
            <p className="legal-text">
              Use of Goyal Traders services is subject to commercial schedules and agreed commission or fee structures:
            </p>
            <div className="legal-grid-2col">
              <div className="legal-grid-item">
                <h4>Pre-funded Wallet &amp; Ledger</h4>
                <p>Transactions are processed against positive partner virtual ledger balances. Requests will fail if sufficient ledger balance is unavailable.</p>
              </div>
              <div className="legal-grid-item">
                <h4>Commissions &amp; Margins</h4>
                <p>Commissions, margin payouts, or platform fees are credited or debited in accordance with your executed commercial service annexure.</p>
              </div>
              <div className="legal-grid-item">
                <h4>Taxation &amp; GST Compliance</h4>
                <p>All fees are subject to statutory Goods and Services Tax (GST) and Tax Deducted at Source (TDS) as per current Indian taxation laws.</p>
              </div>
              <div className="legal-grid-item">
                <h4>Reconciliation &amp; Discrepancies</h4>
                <p>Discrepancies in daily transaction records must be formally raised within 3 business days of statement generation.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">5. Prohibited Conduct</h2>
            <p className="legal-text">
              Partners and developers agree never to:
            </p>
            <ul className="legal-list">
              <li>Deploy automated scripts or bots designed to bypass rate limits or reverse-engineer API schemas.</li>
              <li>Facilitate unauthorized fund transfers, gambling transactions, money laundering, or illegal trade channels.</li>
              <li>Resell, sublicense, or white-label platform access without express written authorization from Goyal Traders.</li>
              <li>Introduce malicious scripts, viruses, or Trojan routines into Goyal Traders&rsquo; network infrastructure.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">6. Service Uptime &amp; Disclaimers</h2>
            <p className="legal-text">
              While Goyal Traders strives to maintain 99.9% switch availability, our services rely upon external telecom gateways, BBPS switches, and banking partner infrastructure:
            </p>
            <ul className="legal-list">
              <li><strong>Downstream Dependencies:</strong> We are not liable for transaction processing latencies or failures attributable to downstream banking downtime, operator network outages, or scheduled maintenance windows.</li>
              <li><strong>Disclaimer of Warranties:</strong> The platform and APIs are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">7. Limitation of Liability</h2>
            <p className="legal-text">
              To the maximum extent permitted under applicable law, Goyal Traders, its directors, employees, and affiliates shall
              not be liable for any indirect, incidental, punitive, or consequential damages, loss of business revenue, or loss of data arising from
              the use of or inability to use our services. Our aggregate liability under any claim shall not exceed the net commission fees earned by us
              from the specific disputed transaction giving rise to such claim.
            </p>
          </section>

          {/* Section 8 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">8. Governing Law &amp; Dispute Resolution</h2>
            <p className="legal-text">
              These Terms shall be governed by, construed, and enforced in accordance with the substantive laws of India.
              Any dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction
              of the competent courts located in the city of the Company&rsquo;s registered office.
            </p>
          </section>

          {/* Section 9 */}
          <section className="legal-section">
            <h2 className="legal-section-heading">9. Contact for Legal Inquiries</h2>
            <div className="legal-callout">
              For official legal correspondence, notices, or partnership clarification, please reach out via:
              <br />
              <strong>Email:</strong> legal@goyaltraders.example &nbsp;|&nbsp; <strong>Helpline:</strong> +91 00000 00000
              <br />
              <strong>Address:</strong> Goyal Traders, Registered Office, [Add address], India.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
