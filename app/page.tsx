import { PixelImage } from "@/components/magicui/pixel-img";
import { db } from "@/lib/db.config";

export default function Home(){

  return (
    <div className="flex justify-center items-center h-screen">
      <PixelImage src="/image.png"
      customGrid={{ rows: 2, cols: 2 }}
      grayscaleAnimation/>
    </div>
  )
}