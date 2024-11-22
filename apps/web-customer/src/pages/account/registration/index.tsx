/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { RegistrationBlock } from "../../../components/blocks/RegistrationBlock/RegistrationBlock";

 const RegistrationPage:React.FC = () => <RegistrationBlock/>

export const getServerSideProps: GetServerSideProps = async (context) => {
    const referer = context.req.headers.referer || "";

    if (!referer || !referer.includes(context.req.headers.host || "")) {
        return {
            redirect: {
                destination: "/404",
                permanent: false
            }
        }
    }

    const cspProps = await withCSP()(context);

    return {
        ...cspProps
    }
}

export default RegistrationPage;