import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../assets/ILN Logo v2.png";

function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="privacy-policy p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p>
            Integrated Logistics Network, a premier Logistics Networking
            Platform, now referred to as ILN. Trendsetterz International
            Limited, a company registered in Hong Kong.
          </p>
          <p>
            Websites:{" "}
            <a
              href="https://www.integratedlognet.com"
              target="_blank"
              className="text-blue-400"
            >
              www.integratedlognet.com
            </a>
            ,{" "}
            <a
              href="https://www.integratedlogisticsnetwork.com"
              target="_blank"
              className="text-blue-400"
            >
              www.integratedlogisticsnetwork.com
            </a>
          </p>
          <img src={logo} alt="ILN" className="w-1/2" />
          <p>
            Integrated Logistics Network – ILN logo, ILN Brochure, ILN website
            and the ILN Network besides the title TRENDSETTERZ are the property
            of Trendsetterz International Limited.
          </p>
          <ul className="list-disc ml-6">
            <li>
              The Browser, Viewer or the User of the website/websites accesses
              the website and the brochure contents of the Integrated Logistics
              Network under the following terms and conditions.
            </li>
            <li>
              These Website Standard Terms and Conditions contained herein on
              this webpage, shall govern your use of this website, including all
              pages within this website (collectively referred to herein below
              as this “Website”).
            </li>
            <li>
              This Website is not for use by any minors (defined as those who
              are below 18 years of age), and you must not use this Website if
              you are a minor.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Welcome to Integrated Logistics Network
          </h2>
          <p>
            Welcome to Integrated Logistics Network (ILN), a premier logistics
            networking platform operating under the esteemed flagship of
            Trendsetterz International Limited, Hong Kong. At ILN, your privacy
            is paramount. This Privacy and Cookies Policy is meticulously
            designed to clearly outline how we collect, use, disclose, and
            safeguard your personal information, including using cookies and
            similar technologies, when you access and utilize our website and
            services.
          </p>
          <p>
            We are deeply committed to processing your personal data lawfully,
            fairly, and transparently, respecting your data protection rights,
            and ensuring compliance with applicable data privacy laws across
            various jurisdictions. As a company registered in Hong Kong, we are
            primarily governed by the Personal Data (Privacy) Ordinance (PDPO)
            (Cap. 486). Furthermore, recognizing the global nature of our
            platform, we also adhere to the principles and requirements of the
            General Data Protection Regulation (GDPR) for individuals in the
            European Economic Area (EEA) and the United Kingdom, and the
            California Consumer Privacy Act (CCPA) / California Privacy Rights
            Act (CPRA) for California residents, among other relevant global
            privacy frameworks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the ILN website and services, you acknowledge
            that you have read and understood this Privacy and Cookies Policy
            and agree to its terms.{" "}
            <span className="underline">
              If you do not agree with these terms, please do not access or use
              our website.
            </span>
          </p>
          <p>
            ILN may change these Terms of Use from time to time. Therefore, your
            continued access or use of the website constitutes your acceptance
            of such changes.
          </p>
          <p>
            Your access and use of the website will be subject to the latest
            updated version of the terms of Use, rules and guidelines posted on
            this website. You may not use any content of the ILN Website or any
            image without the prior written consent of Trendsetterz
            International Limited (ILN).
          </p>
          <p>
            If you breach the terms of use, your license to access or use of the
            website shall automatically terminate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Definitions</h2>
          <p>
            To help you understand this Policy, here are some key definitions:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Personal Data (or Personal Information):</strong> Any data
              relating directly or indirectly to a living individual, from which
              it is practicable for the identity of the individual to be
              directly or indirectly ascertained, and in a form in which access
              to or processing of the data is practicable. This includes names,
              email addresses, IP addresses, and any other information that can
              directly or indirectly identify an individual.
            </li>
            <li>
              <strong>Processing:</strong> Any operation or set of operations
              which is performed on personal data or on sets of personal data,
              whether or not by automated means, such as collection, recording,
              organization, structuring, storage, adaptation or alteration,
              retrieval, consultation, use, disclosure by transmission,
              dissemination or otherwise making available, alignment or
              combination, restriction, erasure or destruction.
            </li>
            <li>
              <strong>Data Subject:</strong> The living individual to whom
              Personal Data relates.
            </li>
            <li>
              <strong>Data User / Data Controller:</strong> The natural or legal
              person, public authority, agency, or other body which, alone or
              jointly with others, determines the purposes and means of the
              processing of personal data. For the purposes of this Policy,
              Trendsetterz International Limited (operating ILN) is the Data
              User/Controller.
            </li>
            <li>
              <strong>Data Processor:</strong> A natural or legal person, public
              authority, agency, or other body which processes personal data on
              behalf of the Controller/Data User.
            </li>
            <li>
              <strong>Cookies:</strong> Small text files placed on your device
              by a website that you visit. They are widely used to make websites
              work, or work more efficiently, as well as to provide information
              to the owners of the site.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Information We Collect
          </h2>
          <p>
            We collect various types of information, including personal and
            non-personal data, to provide and improve our services.
          </p>

          <h3 className="font-semibold mt-4">
            3.1. Personal Data You Provide Directly
          </h3>
          <p>
            This is information, you voluntarily provide to us when you register
            for an account, use our services, or communicate with us. The
            categories of personal information we collect may include:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Identifiers:</strong> Name, email address, phone number,
              mailing address, username, unique personal identifier, IP address
              (when directly provided or linked to your account).
            </li>
            <li>
              <strong>Professional/Employment Information:</strong> Company
              name, job title, industry, professional background, skills,
              interests, professional affiliations.
            </li>
            <li>
              <strong> Profile Information:</strong> Profile picture, links to
              professional social media profiles, biographical details you
              choose to share.
            </li>
            <li>
              <strong> Commercial Information:</strong> Records of services
              purchased or considered (if any premium services are offered),
              payment details (only if directly entered, otherwise via
              third-party processors).
            </li>
            <li>
              <strong> Communication Data:</strong> Content of messages and
              communications exchanged through our platform or direct contact
              (e.g., customer support inquiries, survey responses, feedback).
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            3.2. Information Collected Automatically (Through Technology):
          </h3>
          <p>
            When you access or use our website and services, we automatically
            collect certain information about your device and usage patterns.
            The categories of information collected automatically may include:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>
                {" "}
                Internet or Other Electronic Network Activity Information:
              </strong>{" "}
              Browse history, search history, information regarding your
              interaction with our website, application, or advertisements, logs
              of pages viewed, links clicked, time spent, and features used.
            </li>
            <li>
              <strong> Device information:</strong> Device type, operating
              system, browser type and version, language settings, unique device
              identifiers, mobile network information, screen resolution,
              referral source.
            </li>
            <li>
              <strong> Geolocation Data:</strong> Approximate geographic
              location derived from your IP address or other network
              information.
            </li>
            <li>
              <strong>Cookies and tracking technologies:</strong> Information
              collected through cookies, web beacons, pixels, and similar
              technologies regarding your preferences and interactions with our
              site. (See Section 6 for detailed information on Cookies).
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            3.3. Information from Third Parties (Sources of Personal
            Information):
          </h3>
          <p>
            In some instances, we may receive information about you from
            third-party sources. These sources may include:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Social Media Platforms:</strong> If you choose to connect
              your ILN account with your social media profiles (e.g., LinkedIn,
              where applicable), we may receive certain information from those
              platforms based on your privacy settings and their terms of
              service.
            </li>
            <li>
              <strong>Business Partners:</strong> Information from partners with
              whom we offer co-branded services, engage in joint marketing
              activities, or collaborate on industry events.
            </li>
            <li>
              <strong>Publicly Available Sources:</strong> Information from
              public databases, professional registries, or publicly accessible
              professional profiles (e.g., company websites, professional
              directories).
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. How We Use Your Information (Purposes and Legal Basis)
          </h2>
          <p>
            We process your personal information for specific purposes and rely
            on various legal bases for processing, ensuring compliance with Hong
            Kong's PDPO (Data Protection Principle 3) and GDPR (Article 6).
          </p>

          <h3 className="font-semibold mt-4">
            To Provide and Maintain Our Services (Contractual Necessity /
            Legitimate Interest)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To operate, maintain, and improve the functionality of the ILN
              platform.
            </li>
            <li>
              To facilitate networking features, enable connections, and display
              your public profile to relevant members.
            </li>
            <li>To personalize your experience and content on the platform.</li>
            <li>
              <strong>Legal Basis:</strong> Necessary for the performance of a
              contract with you or to take steps at your request prior to
              entering into a contract; our legitimate interest in providing a
              functional and effective platform.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            To Manage Your Account (Contractual Necessity)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To create and administer your account, verify your identity, and
              manage your membership.
            </li>
            <li>
              To provide customer support and respond to your inquiries and
              requests.
            </li>
            <li>
              <strong>Legal Basis:</strong> Necessary for the performance of a
              contract with you.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            To Communicate with You (Contractual Necessity / Legitimate Interest
            / Consent)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To send you service-related announcements, essential updates,
              security alerts, and administrative messages.
            </li>
            <li>
              To send newsletters, marketing communications, and information
              about products or services we believe may be of interest to you.
            </li>
            <li>
              <strong>Legal Basis:</strong> Necessary for the performance of a
              contract with you; our legitimate interest in communicating
              important information and promoting our services; or your explicit
              consent, particularly for marketing (which you can withdraw at any
              time).
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            For Analytics and Improvement (Legitimate Interest)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To understand how users interact with our platform, analyze
              trends, and identify areas for improvement in service delivery and
              user experience.
            </li>
            <li>
              To conduct research and development of new features, products, and
              services.
            </li>
            <li>
              <strong>Legal Basis:</strong> Our legitimate interest in
              continuously improving our services and understanding user needs.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            For Marketing and Advertising (Legitimate Interest / Consent)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To deliver targeted advertisements (where permitted by law and
              your preferences).
            </li>
            <li>To measure the effectiveness of our advertising campaigns.</li>
            <li>
              <strong>Legal Basis:</strong> Our legitimate interest in promoting
              our services; or your explicit consent, where required by law.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            For Security and Fraud Prevention (Legitimate Interest / Legal
            Obligation)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To detect, prevent, and address technical issues, security
              incidents, fraudulent activities, and unauthorized access or use
              of our services.
            </li>
            <li>
              To protect the rights, property, or safety of Trendsetterz
              International Limited, ILN, our users, or others.
            </li>
            <li>
              <strong>Legal Basis:</strong> Our legitimate interest in
              maintaining a secure platform; necessary for compliance with a
              legal obligation.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            To Comply with Legal Obligations (Legal Obligation)
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              To meet our legal, regulatory, and compliance requirements,
              including responding to lawful requests from public authorities.
            </li>
            <li>
              <strong>Legal Basis:</strong> Necessary for compliance with a
              legal obligation to which we are subject.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. How We Share Your Information (Disclosure)
          </h2>
          <p>
            We may share your information with third parties in the following
            circumstances and for the purposes outlined below, always adhering
            to Hong Kong's PDPO (Data Protection Principle 3) regarding
            permissible uses and disclosures.
          </p>

          <h3 className="font-semibold mt-4">With Other Users</h3>
          <p>
            As a networking platform, certain information you make public in
            your profile (e.g., your name, company, job title, professional
            background, posts, and interactions) will be visible to other ILN
            members as part of the core functionality.
          </p>

          <h3 className="font-semibold mt-4">
            With Service Providers (Data Processors)
          </h3>
          <p>
            We engage third-party vendors, consultants, and other service
            providers to perform services on our behalf and assist us in
            operating our business (e.g., hosting, data analytics, payment
            processing, customer support, email delivery, marketing, security).
          </p>
          <p>
            These providers are contractually bound to protect your information,
            use it only for the purposes for which it was disclosed, and comply
            with applicable data protection laws. We carefully select service
            providers who maintain appropriate security measures.
          </p>

          <h3 className="font-semibold mt-4">For Business Transfers</h3>
          <p>
            In connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business by another company. In such cases, your personal
            information may be part of the transferred assets.
          </p>

          <h3 className="font-semibold mt-4">
            For Legal Reasons and Law Enforcement
          </h3>
          <p>
            We may disclose your information if required to do so by law, court
            order, governmental regulation, or in the good faith belief that
            such action is necessary to:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              Comply with a legal obligation (e.g., a subpoena or court order).
            </li>
            <li>
              Protect and defend the rights or property of Trendsetterz
              International Limited or ILN.
            </li>
            <li>
              Prevent or investigate possible wrongdoing in connection with the
              Service.
            </li>
            <li>
              Act in urgent circumstances to protect the personal safety of
              users of the Services or the public.
            </li>
            <li>Protect against legal liability.</li>
          </ul>

          <h3 className="font-semibold mt-4">
            With Your Consent or At Your Direction
          </h3>
          <p>
            We may share your information with your explicit consent or at your
            direction.
          </p>

          <h3 className="font-semibold mt-4">
            No Sale or Sharing of Personal Information (CCPA/CPRA)
          </h3>
          <p>
            ILN does not "sell" your personal information in exchange for
            monetary or other valuable consideration, nor do we "share" it for
            cross-context behavioral advertising as defined by the CCPA and
            CPRA. We do not provide your personal information to third parties
            for their independent use without providing you with the right to
            opt-out.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6. Cookies and Other Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies (like web beacons,
            pixels, and local storage) to track activity on our Service and hold
            certain information. This helps us to improve your experience,
            analyze site usage, and support our marketing efforts.
          </p>

          <h3 className="font-semibold mt-4">6.1. What are Cookies?</h3>
          <p>
            Cookies are small text files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work, or work more efficiently, as well as to provide
            reporting information to the site owners.
          </p>

          <h3 className="font-semibold mt-4">6.2. How We Use Cookies</h3>
          <p>We use cookies for various purposes:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Strictly Necessary Cookies:</strong> Essential for the
              operation of our website and services. They enable core
              functionalities such as user authentication, security, and session
              management. Without these cookies, the website may not function
              correctly.
            </li>
            <li>
              <strong>Performance and Analytics Cookies:</strong> Collect
              information about how visitors use our website (e.g., which pages
              are most popular, time spent on pages, referral sources). This
              data helps us understand and improve the performance and usability
              of our website.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Allow our website to
              remember choices you make (e.g., your username, language, or
              region) and provide enhanced, more personalized features.
            </li>
            <li>
              <strong>Targeting/Advertising Cookies (where applicable):</strong>{" "}
              Used to deliver advertisements more relevant to you and your
              interests, limit the number of times you see an advertisement, and
              measure the effectiveness of advertising campaigns. They may be
              placed by advertising networks with our permission.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            6.3. Types of Cookies We May Use
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Session Cookies:</strong> Temporary cookies that expire
              when you close your browser. They are used to identify you during
              a single browsing session.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> Remain on your device for a
              set period or until you delete them. They are used to remember
              your preferences and actions across multiple visits.
            </li>
            <li>
              <strong>First-Party Cookies:</strong> Set by the website you are
              visiting (i.e., by ILN).
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> Set by a domain other than
              the one you are visiting, often used by external services like
              analytics providers (e.g., Google Analytics) or advertising
              networks.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">
            6.4. Your Choices Regarding Cookies
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Browser Settings:</strong> Most web browsers are set to
              accept cookies by default. You can usually modify your browser
              setting to decline cookies or to notify you when a cookie is being
              placed on your device. Please refer to your browser's help menu
              for instructions.
            </li>
            <li>
              <strong>Cookie Consent Tool:</strong> For users in regions
              requiring explicit consent (like GDPR and some PCPD contexts for
              non-essential cookies), our website may display a cookie consent
              banner or tool that allows you to manage your cookie preferences
              (e.g., opting in or out of specific categories of cookies). This
              tool ensures that non-essential cookies are only placed with your
              informed consent.
            </li>
            <li>
              <strong>Impact of Disabling Cookies:</strong> Please be aware that
              if you choose to decline or remove cookies, it may affect the
              functionality and your overall experience of our website and
              services. Certain features may not work correctly or may become
              unavailable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Your Data Protection Rights
          </h2>
          <p>
            Depending on your location and applicable data protection laws
            (including PDPO, GDPR, CCPA/CPRA, and other relevant frameworks),
            you may have the following rights regarding your personal data. We
            are committed to facilitating these rights.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>
                The Right to Be Informed (PDPO DPP1, GDPR Article 13/14):
              </strong>{" "}
              To receive clear, transparent, and easily understandable
              information about how we use your personal data and your rights.
              This policy serves that purpose.
            </li>
            <li>
              <strong>
                The Right of Access (PDPO DPP6, GDPR Article 15, CCPA/CPRA):
              </strong>{" "}
              To request confirmation of whether we process personal data about
              you and, if so, to request a copy of that data. This includes
              knowing the categories of personal information we have collected,
              the categories of sources from which the personal information is
              collected, the business or commercial purpose for collecting,
              selling, or sharing personal information, and the categories of
              third parties to whom we disclose personal information.
            </li>
            <li>
              <strong>
                The Right to Rectification / Correction (PDPO DPP2, GDPR Article
                16, CCPA/CPRA):
              </strong>{" "}
              To request that inaccurate or incomplete personal data about you
              be corrected or completed without undue delay.
            </li>
            <li>
              <strong>
                The Right to Erasure / Deletion / "Right to be Forgotten" (GDPR
                Article 17, CCPA/CPRA):
              </strong>{" "}
              To request the deletion of your personal data under certain
              circumstances (e.g., if the data is no longer necessary for the
              purposes for which it was collected, or if you withdraw consent
              and there is no other legal basis for processing).
            </li>
            <li>
              <strong>
                The Right to Restriction of Processing (GDPR Article 18):
              </strong>{" "}
              To request that we limit the way we use your personal data in
              certain circumstances (e.g., if you contest the accuracy of the
              data, or if you object to our processing and we are verifying
              legitimate grounds).
            </li>
            <li>
              <strong>The Right to Data Portability (GDPR Article 20):</strong>{" "}
              To receive your personal data in a structured, commonly used, and
              machine-readable format, and to transmit that data to another
              controller, where technically feasible.
            </li>
            <li>
              <strong>
                The Right to Object to Processing (GDPR Article 21):
              </strong>{" "}
              To object to the processing of your personal data based on our
              legitimate interests or for direct marketing purposes.
            </li>
            <li>
              <strong>
                Rights in Relation to Automated Decision-Making and Profiling
                (GDPR Article 22, CCPA/CPRA):
              </strong>{" "}
              To not be subject to a decision based solely on automated
              processing, including profiling, which produces legal effects
              concerning you or similarly significantly affects you, unless
              certain exceptions apply. We do not currently use automated
              decision-making that would produce such legal effects.
            </li>
            <li>
              <strong>
                The Right to Withdraw Consent (GDPR Article 7, PDPO DPP3):
              </strong>{" "}
              Where we rely on your consent to process your personal data, you
              have the right to withdraw that consent at any time. Withdrawal of
              consent does not affect the lawfulness of processing based on
              consent before its withdrawal.
            </li>
            <li>
              <strong>The Right to Non-Discrimination (CCPA/CPRA):</strong> We
              will not discriminate against you for exercising any of your
              privacy rights.
            </li>
          </ul>

          <p className="mt-4">
            To exercise any of these rights, please contact us using the details
            provided in <strong>Section 13</strong>. We may need to verify your
            identity before fulfilling your request to ensure the security of
            your data. We will respond to your request within the legally
            required timeframe (e.g., 40 days for PDPO access/correction
            requests, 30 days for GDPR, 45 days for CCPA/CPRA, with extensions
            if necessary and notified to you).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            8. Data Security (PDPO DPP4)
          </h2>
          <p>
            We are deeply committed to protecting the security of your personal
            information. We implement a variety of reasonable administrative,
            technical, and physical security measures designed to protect your
            personal data from unauthorized or accidental access, processing,
            erasure, loss, or use. These measures include:
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Encryption:</strong> Using encryption technologies (e.g.,
              SSL/TLS) for data in transit to protect data from interception.
            </li>
            <li>
              <strong>Access Controls:</strong> Restricting access to personal
              data to authorized personnel only, based on a strict need-to-know
              basis.
            </li>
            <li>
              <strong>Firewalls and Intrusion Detection Systems:</strong> To
              protect our networks and systems from unauthorized access.
            </li>
            <li>
              <strong>Regular Security Audits and Assessments:</strong> To
              identify and address potential vulnerabilities and ensure ongoing
              security.
            </li>
            <li>
              <strong>Employee Training:</strong> Ensuring our staff are
              regularly trained on data protection best practices, security
              protocols, and their responsibilities to protect personal data.
            </li>
            <li>
              <strong>Data Minimization:</strong> Collecting only the personal
              data that is adequate, relevant, and not excessive in relation to
              the purpose for which it is collected.
            </li>
          </ul>

          <p className="mt-4">
            While we strive to use commercially acceptable means to protect your
            personal information, no method of transmission over the Internet or
            method of electronic storage is 100% secure. Therefore, we cannot
            guarantee its absolute security.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            9. Data Retention (PDPO DPP2)
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              We retain your personal information for as long as necessary to
              fulfill the purposes for which it was collected, as outlined in
              this Privacy and Cookies Policy, unless a longer retention period
              is required or permitted by law (e.g., for legal, tax, accounting,
              audit, or dispute resolution purposes).
            </li>
            <li>
              To determine the appropriate retention period for personal data,
              we consider the amount, nature, and sensitivity of the personal
              data, the potential risk of harm from unauthorized use or
              disclosure of your personal data, the purposes for which we
              process your personal data and whether we can achieve those
              purposes through other means, and the applicable legal,
              regulatory, tax, accounting, or other requirements. When personal
              data is no longer needed, we take all practicable steps to erase
              it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            10. International Data Transfers (PDPO DPP3, GDPR Chapter V)
          </h2>
          <p>
            Trendsetterz International Limited is based in Hong Kong. Your
            information, including personal data, may be transferred to, stored
            in, and processed in Hong Kong and other jurisdictions outside of
            your state, province, country, or other governmental jurisdiction
            where the data protection laws may differ from those from your
            jurisdiction.
          </p>

          <p className="mt-3">
            For transfers of personal data originating from the European
            Economic Area (EEA), the UK, or other regions with robust data
            export rules, we implement appropriate safeguards to ensure that
            your personal data receives an adequate level of protection. These
            safeguards may include:
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Standard Contractual Clauses (SCCs):</strong> Implementing
              the European Commission's or UK's Standard Contractual Clauses
              with our service providers or other recipients of data.
            </li>
            <li>
              <strong>Adequacy Decisions:</strong> Relying on European
              Commission adequacy decisions where a country is deemed to provide
              an adequate level of data protection.
            </li>
            <li>
              <strong>Your Explicit Consent:</strong> Where permitted by law,
              your explicit consent to the transfer after being informed of the
              possible risks of such transfers.
            </li>
          </ul>

          <p className="mt-3">
            By using our services, you understand and consent to your
            information being transferred to our facilities and those third
            parties with whom we share it as described in this Privacy and
            Cookies Policy. We will take all steps reasonably necessary to
            ensure that your data is treated securely and in accordance with
            this Privacy and Cookies Policy and no transfer of your Personal
            Data will take place to an organization or a country unless there
            are adequate controls in place, including the security of your data
            and other personal information.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            11. Children's Privacy
          </h2>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personally identifiable information from
            anyone under the age of 18. If you are a parent or guardian and you
            are aware that your child has provided us with Personal Data, please
            contact us. If we become aware that we have collected Personal Data
            from children without verification of parental consent, we will take
            steps to remove that information from our servers.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            12. Changes to This Privacy and Cookies Policy
          </h2>
          <p>
            We may update our Privacy and Cookies Policy from time to time to
            reflect changes in our practices, legal requirements, or new
            technologies. We will notify you of any material changes by posting
            the new Privacy and Cookies Policy on this page and updating the
            "Effective Date" at the top of this Policy. We encourage you to
            review this Privacy and Cookies Policy periodically for any changes.
            Changes to this Privacy and Cookies Policy are effective when they
            are posted on this page.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy and Cookies Policy, your data protection rights, or our data
            handling practices, please do not hesitate to contact us.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
