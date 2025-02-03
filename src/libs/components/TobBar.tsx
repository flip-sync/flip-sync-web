import Image from "next/image";
import Link from "next/link";

interface TopBarProps {
  isLoggedIn?: boolean;
  userImage?: string;
}

export default function TopBar({ isLoggedIn = false, userImage }: TopBarProps) {
  return (
    <header className="w-full h-16 border-b border-gray-200">
      <div className="bg-primary h-full px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/appIcon.png"
            alt="FlipSync 로고"
            width={50}
            height={50}
          />
        </Link>

        <div>
          {isLoggedIn ? (
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <Image
                src={userImage || "/default-profile.svg"}
                alt="프로필 이미지"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-white text-primary  transition-colors"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
