"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <div>
      <div className="max-w-screen-lg mx-auto flex justify-around py-3">
        <Link href="/rooms" className="flex flex-col items-center space-y-1">
          <Image
            src={
              pathname?.startsWith("/rooms") ? "users.svg" : "users-gray.svg"
            }
            width={24}
            height={24}
            alt="악보공유방"
          />
          <span
            className={`text-xs ${
              pathname?.startsWith("/rooms") ? "text-primary" : "text-gray-400"
            }`}
          >
            악보공유방
          </span>
        </Link>

        <Link href="/storage" className="flex flex-col items-center space-y-1">
          <Image
            src={
              pathname?.startsWith("/storage")
                ? "document.svg"
                : "document-gray.svg"
            }
            width={24}
            height={24}
            alt="악보창고"
            className="text-gray-400"
          />
          <span
            className={`text-xs ${
              pathname?.startsWith("/storage")
                ? "text-primary"
                : "text-gray-400"
            }`}
          >
            악보창고
          </span>
        </Link>

        <Link href="/mypage" className="flex flex-col items-center space-y-1">
          <Image
            src="profile.svg"
            width={24}
            height={24}
            alt="마이페이지"
            className="text-gray-400"
          />
          <span
            className={`text-xs ${
              pathname?.startsWith("/mypage") ? "text-primary" : "text-gray-400"
            }`}
          >
            마이페이지
          </span>
        </Link>
      </div>
    </div>
  );
}
