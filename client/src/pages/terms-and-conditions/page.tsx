import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function TermsAndConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        body {
          font-family: 'Montserrat', sans-serif !important;
        }
        * {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}</style>
      <div className="pt-20">
        <Header />
      </div>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-left">
            Terms And Condition :
          </h1>
          <div className="prose prose-lg max-w-none">
            <div className="rich-text-content text-gray-700 leading-relaxed text-left">
              <p className="mb-6">
                This terms and condition ("Terms"/ "Agreement") is an agreement between Adonis Medical Systems Private Limited which shall mean and include its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies ("Adonis", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of our main website "www.adonismedical.com" including any sub-domains of this website, unless excluded by their own terms (collectively referred to as "Website").
              </p>

              <h2 className="section-heading">ACCURACY OF INFORMATION</h2>
              <p className="mb-6">
                Occasionally there may be information on the Website that contains typographical errors, inaccuracies or omissions that may relate to promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Website is inaccurate at any time without prior notice (including after you have submitted your order) to you. We undertake no obligation to update, amend or clarify information on the Website including, without limitation, pricing information, except as required by law. No specified update or fresh date applied on the Website should be taken to indicate that all information on the Website has been modified or updated.
              </p>

              <h2 className="section-heading">LINKS TO OTHER WEBSITES</h2>
              <p className="mb-6">
                Although this Website may be linked to other websites, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of any businesses or individuals or the content of their websites. We do not assume any responsibility or liability for the actions, products, services and content of any other third parties. You should carefully review the legal statements and other conditions of use of any website that you access through a link from our Website. Your linking to any other off-site websites is at your own risk.
              </p>

              <h2 className="section-heading">PROHIBITED USES</h2>
              <p className="mb-6">
                In addition to other terms as set forth in the Agreement, you are prohibited from using  our Website or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website  or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Website or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Website or any related website for violating any of the prohibited uses.
              </p>

              <h2 className="section-heading">INTELLECTUAL PROPERTY RIGHTS</h2>
              <p className="mb-6">
                This Agreement does not transfer from Adonis to you, any of Adonis's or third-party intellectual property, and all right, title, and interest in and to such property will remain (as between the parties) solely with Adonis. All trademarks, service marks, graphics and logos used in connection with our Website, are trademarks or registered trademarks of Adonis. Other trademarks, service marks, graphics and logos used in connection with our Website may be the trademarks of other third parties. Your use of our Website grants you no right or license to reproduce or otherwise use any of Adonis's or third-party trademarks.
              </p>

              <h2 className="section-heading">DISCLAIMER OF WARRANTY</h2>
              <p className="mb-6">
                You agree that your use of our Website is solely at your own risk. You agree that such Website is provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that   our Website will meet your requirements, or that  our Website will be uninterrupted, timely, secure, or error free; nor do we make any warranty as to the results that may be obtained from the use of our Website or as to the accuracy or reliability of any information obtained through our Website or that defects in the our Website will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of our Website is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through our Website or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through our Website shall create any warranty not expressly made herein.
              </p>

              <h2 className="section-heading">LIMITATION OF LIABILITY</h2>
              <p className="mb-6">
                To the fullest extent permitted by applicable law, in no event will Adonis, its affiliates,  officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use or content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Adonis has been advised as to the possibility of such damages or could have foreseen such damages.
              </p>

              <h2 className="section-heading">INDEMNIFICATION</h2>
              <p className="mb-6">
                You agree to indemnify and hold Adonis and its affiliates, directors, officers, employees, and agents including its parent company/holding company, subsidiaries, affiliates, associate companies and Refex Group of Companies harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your content, your use of  our Website or any willful misconduct on your part.
              </p>

              <h2 className="section-heading">SEVERABILITY</h2>
              <p className="mb-6">
                All rights and restrictions contained in this Agreement may be exercised and shall apply and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.
              </p>

              <h2 className="section-heading">DISPUTE RESOLUTION</h2>
              <p className="mb-6">
                The Policy shall be governed by the laws of India and the Courts in Chennai shall have the exclusive jurisdiction to try any dispute arising thereof.
              </p>

              <h2 className="section-heading">CHANGES AND AMENDMENTS</h2>
              <p className="mb-6">
                We reserve the right to modify this Agreement or its policies relating to our Website at any time, effective upon posting of an updated version of this Agreement on the Website. When we do we will post a notification on the main page of our Website. Continued use of the Website after any such changes shall constitute your consent to such changes.
              </p>

              <h2 className="section-heading">ACCEPTANCE OF THESE TERMS</h2>
              <p className="mb-6">
                You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using our Website you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access our Website.
              </p>

              <h2 className="section-heading">CONTACTING US</h2>
              <p className="mb-6">
                If you have any questions about this Agreement, please contact us at info@adonismedical.com. This document was last updated on 05th  February, 2024.
              </p>
            </div>
          </div>
          
          <style>{`
            body {
              font-family: 'Montserrat', sans-serif !important;
            }
            .rich-text-content {
              line-height: 1.8;
              color: #374151;
              font-family: 'Montserrat', sans-serif !important;
            }
            .rich-text-content h1,
            .rich-text-content h2,
            .rich-text-content h3,
            .rich-text-content h4,
            .rich-text-content h5,
            .rich-text-content h6 {
              font-weight: bold;
              margin-top: 2em;
              margin-bottom: 1em;
              color: #1f2937;
              line-height: 1.4;
              page-break-after: avoid;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content .section-heading {
              font-weight: 700;
              font-size: 1.1em;
              text-transform: uppercase;
              margin-top: 2em;
              margin-bottom: 1em;
              color: #1f2937;
              letter-spacing: 0.5px;
            }
            .rich-text-content > h1:first-child,
            .rich-text-content > h2:first-child,
            .rich-text-content > h3:first-child,
            .rich-text-content > h4:first-child,
            .rich-text-content > h5:first-child,
            .rich-text-content > h6:first-child {
              margin-top: 0;
            }
            .rich-text-content h1 { 
              font-size: 2em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content h2 { 
              font-size: 1.75em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content h3 { 
              font-size: 1.5em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content h4 { 
              font-size: 1.25em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content p {
              margin-bottom: 1em;
              line-height: 1.8;
              color: #374151;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content p:last-child {
              margin-bottom: 0;
            }
            .rich-text-content strong,
            .rich-text-content b {
              font-weight: 700;
              color: #1f2937;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content em,
            .rich-text-content i {
              font-style: italic;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content ul,
            .rich-text-content ol {
              margin-left: 1.5em;
              margin-bottom: 1em;
              padding-left: 1.5em;
            }
            .rich-text-content li {
              margin-bottom: 0.5em;
              line-height: 1.8;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content br {
              line-height: 1.8;
            }
            .rich-text-content div {
              margin-bottom: 1em;
              line-height: 1.8;
            }
            .rich-text-content * {
              max-width: 100%;
            }
            .rich-text-content [style*="text-align: center"] {
              text-align: center !important;
            }
            .rich-text-content [style*="text-align: right"] {
              text-align: right !important;
            }
            .rich-text-content [style*="text-align: left"] {
              text-align: left !important;
            }
          `}</style>
        </div>
      </section>

      <Footer />
    </div>
  );
}

