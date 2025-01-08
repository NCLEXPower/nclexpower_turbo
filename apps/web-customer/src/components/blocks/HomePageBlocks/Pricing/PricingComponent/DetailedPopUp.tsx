import { Button, EvaIcon } from "core-library/components";
import { PropsWithChildren } from "react";

interface DetailedProp {
  onClick: () => void;
}

export const DetailedPopUp: React.FC<PropsWithChildren<DetailedProp>> = ({
  children,
  onClick,
}) => {
  return (
    <div className="top-5 h-screen overflow-hidden w-screen fixed z-20 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[40%] h-fit flex flex-col gap-5">
        <Button onClick={onClick} sx={{ width: "150px", borderRadius: "10px" }}>
          Back
        </Button>
        <div className="w-full h-full rounded-3xl bg-white shadow-lg border-2 border-green-900">
          {children}
          <div className="flex justify-center items-center m-10">
            <Button sx={{ width: "200px", borderRadius: "10px" }}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
