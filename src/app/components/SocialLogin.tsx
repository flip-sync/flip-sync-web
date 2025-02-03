import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Image
        src="/kakao.svg"
        alt="Kakao"
        width={44}
        height={44}
        className="cursor-pointer"
      />
      <Image
        src="/apple.svg"
        alt="Apple"
        width={44}
        height={44}
        className="cursor-pointer"
      />
    </div>
  );
}
