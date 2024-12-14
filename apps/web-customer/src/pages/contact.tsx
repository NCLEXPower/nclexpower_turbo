import { ContactFormBlock } from "../components/blocks/ContactBlock/ContactFormBlock";
import { ContactHero } from "../components/blocks/ContactBlock/ContactHero";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { ScrollTopIcon } from "core-library/components";

const ContactPage: React.FC = () => {
  return (
    <div>
      <ContactHero />
      <ContactFormBlock />
      <ScrollTopIcon />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default ContactPage;
