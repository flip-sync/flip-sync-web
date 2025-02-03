export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-gray-200">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-2">FlipSync</h3>
            <p className="text-gray-600 text-sm">
              악보를 공유하고 플레이 하세요!
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-2">
              <a href="#" className="text-gray-600 hover:text-primary">
                이용약관
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                개인정보처리방침
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 FlipSync. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
