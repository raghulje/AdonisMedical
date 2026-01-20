import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface ProductImage {
  id: number;
  imageId: number;
  orderIndex: number;
  isPrimary: boolean;
  image?: {
    filePath: string;
    altText: string;
  };
}

interface ProductFeature {
  id: number;
  featureText: string;
  subtitle: string | null;
  orderIndex: number;
}

interface ProductVariant {
  id: number;
  variantName: string;
  orderIndex: number;
  isActive: boolean;
}

interface ProductPageContent {
  id?: number;
  title: string | null;
  mainImageId: number | null;
  deploymentInfo: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  mainImage?: {
    filePath: string;
    altText: string;
  };
}

interface ProductData {
  content: ProductPageContent | null;
  images: ProductImage[];
  features: ProductFeature[];
  variants: ProductVariant[];
}

export const useProduct = (productSlug: string) => {
  const [data, setData] = useState<ProductData>({
    content: null,
    images: [],
    features: [],
    variants: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [contentRes, imagesRes, featuresRes, variantsRes] = await Promise.all([
          api.get<ProductPageContent>(`/products/${productSlug}`).catch(() => ({ success: false, data: null })),
          api.get<ProductImage[]>(`/products/${productSlug}/images`).catch(() => ({ success: false, data: [] })),
          api.get<ProductFeature[]>(`/products/${productSlug}/features`).catch(() => ({ success: false, data: [] })),
          api.get<ProductVariant[]>(`/products/${productSlug}/variants`).catch(() => ({ success: false, data: [] }))
        ]);

        setData({
          content: contentRes.success && contentRes.data ? contentRes.data as ProductPageContent : null,
          images: imagesRes.success && imagesRes.data ? (imagesRes.data as ProductImage[]).sort((a, b) => a.orderIndex - b.orderIndex) : [],
          features: featuresRes.success && featuresRes.data ? (featuresRes.data as ProductFeature[]).sort((a, b) => a.orderIndex - b.orderIndex) : [],
          variants: variantsRes.success && variantsRes.data ? (variantsRes.data as ProductVariant[]).filter(v => v.isActive).sort((a, b) => a.orderIndex - b.orderIndex) : []
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product data');
        console.error('Error fetching product data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProductData();
    }
  }, [productSlug]);

  return { ...data, loading, error };
};

