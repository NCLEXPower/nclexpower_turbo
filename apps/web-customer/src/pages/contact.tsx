import { ContactFormBlock } from "../components/blocks/LandingPageBlock/ContactBlock/ContactFormBlock";
import { ContactHero } from "../components/blocks/LandingPageBlock/ContactBlock/ContactHero";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { ScrollTop } from "core-library/components";

const ContactPage: React.FC = () => {
  return (
    <div>
      <ContactHero />
      <ContactFormBlock />
      <ScrollTop />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ContactPage;
