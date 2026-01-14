import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface NavigationItem {
  id: number;
  label: string;
  url: string | null;
  parentId: number | null;
  orderIndex: number;
  isActive: boolean;
  openInNewTab: boolean;
  children?: NavigationItem[];
}

export const useNavigation = () => {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<NavigationItem[]>('/navigation');
        if (response.success && response.data) {
          // Filter to only top-level items (no parentId) and sort by orderIndex
          const topLevelItems = (response.data as NavigationItem[])
            .filter(item => !item.parentId && item.isActive)
            .sort((a, b) => a.orderIndex - b.orderIndex);
          
          // Build hierarchy with children
          const itemsWithChildren = topLevelItems.map(item => {
            const children = (response.data as NavigationItem[])
              .filter(child => child.parentId === item.id && child.isActive)
              .sort((a, b) => a.orderIndex - b.orderIndex);
            return { ...item, children: children.length > 0 ? children : undefined };
          });
          
          setItems(itemsWithChildren);
        } else {
          throw new Error(response.message || 'Failed to fetch navigation items');
        }
      } catch (err: any) {
        console.error('Error fetching navigation items:', err);
        setError(err.message || 'Failed to load navigation items');
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  return { items, loading, error };
};

