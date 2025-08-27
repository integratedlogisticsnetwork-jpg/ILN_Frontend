import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../assets/ILN Logo v2.png";

function TermsConditions() {
  return (
    <div>
      <Navbar />
      <div className="privacy-policy p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Terms & Conditions</h1>

        {/* INTRODUCTION */}
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
          <img src={logo} alt="ILN" className="w-1/2 my-4" />
          <p>
            Integrated Logistics Network – ILN logo, ILN Brochure, ILN website
            and the ILN Network besides the title TRENDSETTERZ are the property
            of Trendsetterz International Limited.
          </p>
          <ul className="list-disc ml-6 space-y-2">
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

        {/* INTELLECTUAL PROPERTY RIGHTS */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Intellectual Property Rights
          </h2>
          <p>
            Integrated Logistics Network and/or its licensors own all rights to
            the intellectual property and material contained in this Website,
            and all such rights are reserved. You are granted a limited license
            only, subject to the restrictions provided in these Terms, for
            purposes of viewing the material contained on this Website.
          </p>
        </section>

        {/* RESTRICTIONS */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Restrictions</h2>
          <p>
            You are expressly and emphatically restricted from the following:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Publishing any Website material in any media</li>
            <li>
              Selling, sublicensing and/or otherwise commercializing any Website
              material
            </li>
            <li>Publicly performing and/or showing any Website material</li>
            <li>
              Using this Website in any way that is, or may be, damaging to this
              Website
            </li>
            <li>
              Using this Website in any way that impacts user access to this
              Website
            </li>
            <li>
              Using this Website contrary to applicable laws and regulations, or
              in a way that causes, or may cause, harm to the Website, or to any
              person or business entity
            </li>
            <li>
              Engaging in any data mining, data harvesting, data extracting or
              any other similar activity in relation to this Website, or while
              using this Website
            </li>
            <li>
              Using this Website to engage in any advertising or marketing
            </li>
          </ul>
          <p className="mt-2">
            Certain areas of this Website are restricted from access by
            Non-Members and Integrated Logistics Network may further restrict
            access by you to any areas of this Website, at any time, in its sole
            and absolute discretion.
          </p>
          <p>
            As a member you will have the password-protected login rights with
            the user ID and password for this Website which will remain
            confidential, and you must maintain confidentiality of such
            information.
          </p>
        </section>

        {/* YOUR CONTENT */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Your Content</h2>
          <p>
            In these Websites Standard Terms and Conditions, as a Member “Your
            Content” shall mean any audio, video, text, images or other material
            you choose to display on this Website’s Member’s Page. This content
            is defined as the Member’s Profile.
          </p>
          <p>
            Your Content must be your own and must not be infringing on any
            third party’s rights. Integrated Logistics Network reserves the
            right to remove any of Your Content from this Website at any time,
            and for any reason, without notice.
          </p>
        </section>

        {/* NO WARRANTIES */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">No Warranties</h2>
          <p>
            This Website is provided “as is,” and Integrated Logistics Network
            makes no express or implied representations or warranties, of any
            kind related to this Website or the materials contained on this
            Website. Additionally, nothing contained on this Website shall be
            construed as providing consultation or advice to you.
          </p>
        </section>

        {/* LIMITATIONS OF LIABILITY */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Limitations of Liability
          </h2>
          <p>
            In no event shall Integrated Logistics Network nor any of its
            officers, directors and employees, be liable to you for anything
            arising out of or in any way connected with your use of this
            Website, whether such liability is under contract, tort or
            otherwise, and Integrated Logistics Network including its officers,
            directors and employees shall not be liable for any indirect,
            consequential or special liability arising out of or in any way
            related to your use of this Website.
          </p>
        </section>

        {/* INDEMNIFICATION */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Indemnification</h2>
          <p>
            You as a Member or Non-Member hereby fully indemnify Integrated
            Logistics Network from and against any and all liabilities, costs,
            demands, causes of action, damages and expenses (including
            attorney’s fees) arising out of or in any way related to your breach
            of any of the provisions of these Terms.
          </p>
        </section>

        {/* SEVERABILITY */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid under any applicable law, such unenforceability or
            invalidity shall not render these Terms unenforceable or invalid,
            and such provisions shall be deleted without affecting the remaining
            provisions herein.
          </p>
        </section>

        {/* VARIATION OF TERMS */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Variation of Terms</h2>
          <p>
            Integrated Logistics Network is permitted to revise these Terms at
            any time as seen fit, and by using this Website you are expected to
            review such Terms on a regular basis to ensure you understand all
            terms and conditions governing the use of this Website.
          </p>
        </section>

        {/* ASSIGNMENT */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Assignment</h2>
          <p>
            Integrated Logistics Network shall be permitted to assign, transfer,
            and subcontract its rights and/or obligations under these Terms
            without any notification or consent required. However, you shall not
            be permitted to assign, transfer, or subcontract any of your rights
            and/or obligations under these Terms.
          </p>
        </section>

        {/* ENTIRE AGREEMENT */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Entire Agreement</h2>
          <p>
            These Terms, including any legal notices and disclaimers contained
            on this Website, constitute the entire agreement between Integrated
            Logistics Network and you in relation to your use of this Website,
            and supersede all prior agreements and understandings with respect
            to the same.
          </p>
        </section>

        {/* GOVERNING LAW & JURISDICTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Governing Law & Jurisdiction
          </h2>
          <p>
            These Terms will be governed by and construed in accordance with the
            laws of Hong Kong, and you submit to the non-exclusive jurisdiction
            of the state and federal courts located in Hong Kong for the
            resolution of any disputes.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default TermsConditions;
