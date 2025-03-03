import { ContactFormBlock } from "../components/blocks/LandingPageBlock/ContactBlock/ContactFormBlock";
import { ContactHero } from "../components/blocks/LandingPageBlock/ContactBlock/ContactHero";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { Link, ScrollTop } from "core-library/components";

const ContactPage: React.FC = () => {
  return (
    <div>
      <ContactHero />
      <ContactFormBlock />
      <Link href="/issue-tracking">Issue Tracking</Link>
      <ScrollTop />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ContactPage;
