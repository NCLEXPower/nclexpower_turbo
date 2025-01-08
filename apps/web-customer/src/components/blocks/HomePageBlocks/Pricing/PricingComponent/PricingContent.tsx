/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { EvaIcon } from "core-library/components";
import Divider from "core-library/components/Divider/Divider";

interface ContentProp {
  details: {
    price: number;
    currency: string;
    productType: string;
    duration: string;
    description: string;
    inclusions: Array<{
      label: string;
    }>;
  };
}

const PricingContent: React.FC<ContentProp> = ({ details }) => {
  return (
    <div>
      <div className="h-[250px] flex justify-center flex-row p-10">
        <div className="w-full flex justify-start font-ptSans">
          <div>
            <p className="text-darkGray text-lg">Product Type</p>
            <p className="font-bold text-3xl -mt-4 mb-8">
              {details.productType}
            </p>
            <p className="text-darkGray">Product Duration</p>
            <p className="font-bold text-3xl -mt-4">23 Days - Standard</p>
          </div>
        </div>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 8, borderRightWidth: 2 }}
        />
        <div className="w-full flex justify-center items-end font-ptSans">
          <div className="flex items-center flex-col">
            <p className="font-Poppins font-bold text-6xl">${details.price}</p>
            <p className="text-darkGray -mt-2">Product Price</p>
          </div>
        </div>
      </div>
      <div className="h-[450px] flex flex-col">
        <div className="w-full flex justify-start font-ptSansNarrow px-10 text-lg">
          <p>{details.description}</p>
        </div>
        <div className="px-10">
          <div className="gap-5 flex justify-start items-center">
            <p className="text-black font-ptSansNarrow w-100">
              {details.inclusions &&
                details.inclusions.map((inclusion, index) => (
                  <div className="flex" key={index}>
                    <div className="pr-3">
                      <EvaIcon
                        id="checkmark-circle"
                        name="checkmark-circle-2-outline"
                        width={25}
                        height={25}
                        ariaHidden
                        fill="#084A4E"
                        className="mt-4"
                      />
                    </div>
                    <div>
                      <p>{inclusion.label}</p>
                    </div>
                  </div>
                ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
