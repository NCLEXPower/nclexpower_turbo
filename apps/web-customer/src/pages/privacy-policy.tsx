import React from 'react'
import CSPHead from 'core-library/components/CSPHead';
import { GetServerSideProps } from 'next';
import { withCSP } from 'core-library';
import { PrivacyPolicyBlock } from '@/components/blocks/PrivacyPolicyBlock/PrivacyPolicyBlock';
import { useDesignVisibility } from 'core-library/hooks';

interface Props {
  generatedNonce: string;
}

const PrivacyPolicy: React.FC<Props> = ({ generatedNonce }) => {
  useDesignVisibility();
  return (
    <>
      <CSPHead nonce={generatedNonce} />
      <PrivacyPolicyBlock />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default PrivacyPolicy
