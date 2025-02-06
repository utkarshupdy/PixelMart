import Link from "next/link";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";

interface UserProduct {
  product: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    variants: { price: number }[];
  };
}

export default function UserProduct({ product }: UserProduct) {
    const variants = product.variants || [];
  const minPrice = variants.length > 0 ? Math.min(...variants.map((v) => v.price)) : 0;

  // Ensure that the aspect ratio is maintained
  const imageDimensions = IMAGE_VARIANTS.SQUARE.dimensions;

  return (
    <div key={product._id} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/products/${product._id}`} className="group">
          <figure className="relative" style={{ paddingBottom: `${(imageDimensions.height / imageDimensions.width) * 100}%` }}>
            {/* This div ensures the aspect ratio is maintained for the image */}
            <IKImage
              path={product.imageUrl}
              alt={product.name}
              loading="lazy"
              transformation={[
                {
                  height: imageDimensions.height.toString(),
                  width: imageDimensions.width.toString(),
                  cropMode: "extract",
                  focus: "center",
                  quality: "80",
                },
              ]}
              className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </figure>

          <h2 className="text-lg font-bold mt-2">{product.name}</h2>
          <p className="text-sm text-base-content/70 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-2">
            <div>
              <span className="text-lg font-bold">
                From ${minPrice.toFixed(2)}
              </span>
              <span className="block text-xs text-base-content/50">
                {variants.length} sizes available
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
