import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieAnimationProps {
  animationData: any;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export function LottieAnimation({
  animationData,
  style = {},
}: LottieAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      style={{
        width: "100%",
        height: "auto",
        ...style,
      }}
    />
  );
}
