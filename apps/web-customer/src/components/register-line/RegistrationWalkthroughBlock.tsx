import { RegistrationWizardFormContextProvider } from "./RegistrationWalkthroughContext"
import { RegistrationWalkthroughForm } from "./RegistrationWalkthroughForm"

export const RegistrationWalkthroughBlock = () => {
  return (
    <RegistrationWizardFormContextProvider>
      <RegistrationWalkthroughForm />
    </RegistrationWizardFormContextProvider>
  )
}