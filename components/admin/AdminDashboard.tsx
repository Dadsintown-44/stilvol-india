'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CatalogCategory } from '../../lib/catalog-types';
import AdminSidebar from './AdminSidebar';
import { UploadCloud, Trash2, Edit2, CheckCircle2, Box, Plus, X, Search, Grid as GridIcon, List as ListIcon } from 'lucide-react';
import Image from 'next/image';

type ColorInput = {
  name: string;
  file: File | null;
  sortOrder: number;
};

type FormState = {
  id?: string;
  name: string;
  description: string;
  sortOrder: string;
  image: File | null;
  existingImageUrl?: string;
};

const emptyForm: FormState = {
  name: '',
  description: '',
  sortOrder: '0',
  image: null,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [categoryForm, setCategoryForm] = useState<FormState>(emptyForm);
  const [subcategoryForm, setSubcategoryForm] = useState<FormState>(emptyForm);
  const [productForm, setProductForm] = useState<FormState>(emptyForm);
  const [subcategoryCategoryId, setSubcategoryCategoryId] = useState('');
  const [productSubcategoryId, setProductSubcategoryId] = useState('');
  const [productColors, setProductColors] = useState<ColorInput[]>([
    { name: '', file: null, sortOrder: 0 },
  ]);

  const allSubcategories = useMemo(
    () =>
      categories.flatMap((category) =>
        category.subcategories.map((sub) => ({
          id: sub.dbId,
          categoryId: category.dbId,
          categoryName: category.name,
          label: `${category.name} / ${sub.name}`,
          ...sub
        }))
      ),
    [categories]
  );

  const allProducts = useMemo(
    () =>
      allSubcategories.flatMap((sub) =>
        sub.products.map((p) => ({
          ...p,
          subcategoryName: sub.name,
          categoryName: sub.categoryName
        }))
      ),
    [allSubcategories]
  );

  async function fetchCatalog() {
    setLoading(true);
    setError('');
    const response = await fetch('/api/admin/catalog', { cache: 'no-store' });
    if (!response.ok) {
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      setError('Failed to load admin catalog');
      setLoading(false);
      return;
    }
    const data = await response.json();
    setCategories(data.categories || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    const hasOpenModal = isCategoryModalOpen || isSubcategoryModalOpen || isProductModalOpen;
    if (!hasOpenModal) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isCategoryModalOpen, isSubcategoryModalOpen, isProductModalOpen]);

  async function uploadFile(file: File | null, folder: string) {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/admin/uploads', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return String(data.url);
  }

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const imageUrl = categoryForm.image ? await uploadFile(categoryForm.image, 'categories') : categoryForm.existingImageUrl;
      
      const method = categoryForm.id ? 'PUT' : 'POST';
      const endpoint = categoryForm.id ? `/api/admin/categories/${categoryForm.id}` : '/api/admin/categories';
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryForm.name,
          description: categoryForm.description,
          sortOrder: Number(categoryForm.sortOrder),
          imageUrl,
        }),
      });
      if (!response.ok) throw new Error(`Failed to ${categoryForm.id ? 'update' : 'create'} category`);
      setCategoryForm(emptyForm);
      await fetchCatalog();
      setIsCategoryModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
    } finally {
      setSaving(false);
    }
  }

  async function createSubcategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subcategoryCategoryId) {
      setError('Select a category for subcategory');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const imageUrl = subcategoryForm.image ? await uploadFile(subcategoryForm.image, 'subcategories') : subcategoryForm.existingImageUrl;
      
      const method = subcategoryForm.id ? 'PUT' : 'POST';
      const endpoint = subcategoryForm.id ? `/api/admin/subcategories/${subcategoryForm.id}` : '/api/admin/subcategories';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: subcategoryCategoryId,
          name: subcategoryForm.name,
          description: subcategoryForm.description,
          sortOrder: Number(subcategoryForm.sortOrder),
          imageUrl,
        }),
      });
      if (!response.ok) throw new Error(`Failed to ${subcategoryForm.id ? 'update' : 'create'} subcategory`);
      setSubcategoryForm(emptyForm);
      await fetchCatalog();
      setIsSubcategoryModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create subcategory');
    } finally {
      setSaving(false);
    }
  }

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!productSubcategoryId) {
      setError('Select a subcategory for product');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const imageUrl = productForm.image ? await uploadFile(productForm.image, 'products') : productForm.existingImageUrl;
      const colorVariants = [];
      for (const color of productColors) {
        if (!color.name.trim()) continue;
        const colorImage = color.file ? await uploadFile(color.file, 'product-colors') : undefined;
        colorVariants.push({
          name: color.name.trim(),
          imageUrl: colorImage || '',
          sortOrder: color.sortOrder,
        });
      }

      const method = productForm.id ? 'PUT' : 'POST';
      const endpoint = productForm.id ? `/api/admin/products/${productForm.id}` : '/api/admin/products';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subcategoryId: productSubcategoryId,
          name: productForm.name,
          description: productForm.description,
          sortOrder: Number(productForm.sortOrder),
          imageUrl,
          colorVariants: colorVariants.length > 0 ? colorVariants : undefined,
        }),
      });
      if (!response.ok) throw new Error(`Failed to ${productForm.id ? 'update' : 'create'} product`);
      setProductForm(emptyForm);
      setProductColors([{ name: '', file: null, sortOrder: 0 }]);
      await fetchCatalog();
      setIsProductModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm('Delete this category and all nested data?')) return;
    const response = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchCatalog();
    }
  }

  async function deleteSubcategory(id: string) {
    if (!confirm('Delete this subcategory and its products?')) return;
    const response = await fetch(`/api/admin/subcategories/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchCatalog();
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchCatalog();
    }
  }

  function handleEditCategory(cat: any) {
    setCategoryForm({
      id: cat.dbId,
      name: cat.name,
      description: cat.description || '',
      sortOrder: String(cat.sortOrder),
      image: null,
      existingImageUrl: cat.image
    });
    setIsCategoryModalOpen(true);
  }

  function handleEditSubcategory(sub: any) {
    setSubcategoryCategoryId(sub.categoryId);
    setSubcategoryForm({
      id: sub.dbId,
      name: sub.name,
      description: sub.description || '',
      sortOrder: String(sub.sortOrder),
      image: null,
      existingImageUrl: sub.image
    });
    setIsSubcategoryModalOpen(true);
  }

  function handleEditProduct(product: any) {
    setProductSubcategoryId(product.subcategoryId);
    setProductForm({
      id: product.dbId,
      name: product.name,
      description: product.description || '',
      sortOrder: String(product.sortOrder),
      image: null,
      existingImageUrl: product.image
    });
    setProductColors(product.colorVariants?.length > 0 
      ? product.colorVariants.map((c: any, i: number) => ({ name: c.name, file: null, sortOrder: c.sortOrder || i }))
      : [{ name: '', file: null, sortOrder: 0 }]
    );
    setIsProductModalOpen(true);
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const renderTopBar = (title: string, addLabel: string, onAdd: () => void) => (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#39795F] mb-1">{title}</h1>
          <p className="text-gray-500 text-sm">Create and manage {title.toLowerCase()}.</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border border-gray-100">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded text-sm focus:outline-none focus:border-[#39795F] transition-colors"
            />
          </div>
          <select 
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded text-sm text-gray-600 focus:outline-none focus:border-[#39795F]"
          >
            <option value="asc">Sort order: Low to High</option>
            <option value="desc">Sort order: High to Low</option>
          </select>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <div className="flex bg-gray-100 rounded p-1">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-sm ${viewMode === 'grid' ? 'bg-[#39795F] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}><GridIcon className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-sm ${viewMode === 'list' ? 'bg-[#39795F] text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}><ListIcon className="w-4 h-4" /></button>
          </div>
          <button onClick={onAdd} className="bg-[#39795F] hover:bg-[#00693E] text-white px-5 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap shadow-sm">
            {addLabel}
          </button>
        </div>
      </div>
    </div>
  );

  const filterItems = (items: any[], field: string) => {
    let filtered = items;
    if (searchQuery) {
      filtered = items.filter(item => item[field]?.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Create a copy of the array before sorting to avoid mutating state directly
    return [...filtered].sort((a, b) => {
      const orderA = Number(a.sortOrder) || 0;
      const orderB = Number(b.sortOrder) || 0;
      return sortDirection === 'asc' ? orderA - orderB : orderB - orderA;
    });
  };

  const renderCategoryModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#39795F]/40 p-4 overscroll-contain">
      <div className="bg-gray-50 rounded shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain relative flex flex-col">
        <div className="bg-white p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#39795F]">{categoryForm.id ? 'Edit' : 'Add'} Main Category</h2>
          <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-800 text-sm font-medium">
            Close
          </button>
        </div>
        
        <form onSubmit={createCategory} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">1. Basic Information</h3>
                <label className="block text-xs text-gray-500 mb-1">Name <span className="text-red-500">*</span></label>
                <input placeholder="Name" value={categoryForm.name} onChange={(e) => setCategoryForm(prev => ({...prev, name: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F]" required />
              </div>
              
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex-1">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">2. Description</h3>
                <textarea placeholder="Description" value={categoryForm.description} onChange={(e) => setCategoryForm(prev => ({...prev, description: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F] min-h-[120px] resize-y" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">3. Category Image</h3>
                <label className="block text-xs text-gray-500 mb-1">Image Upload</label>
                <label className="w-full border border-dashed border-gray-300 rounded p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-center bg-white min-h-[140px]">
                  <span className="text-sm text-[#39795F] mb-1">Drag and drop an image here</span>
                  <span className="text-xs text-gray-500">or click to browse</span>
                  <input type="file" accept="image/*" onChange={(e) => setCategoryForm(prev => ({...prev, image: e.target.files?.[0] || null}))} className="hidden" />
                </label>
                <div className="flex gap-2 mt-4">
                  {categoryForm.image && <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-200 truncate max-w-full">{categoryForm.image.name}</span>}
                  {categoryForm.existingImageUrl && !categoryForm.image && <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200 truncate max-w-full">Existing image attached</span>}
                </div>
              </div>

              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">4. Sort Order</h3>
                <input type="number" placeholder="0" value={categoryForm.sortOrder} onChange={(e) => setCategoryForm(prev => ({...prev, sortOrder: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F]" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button disabled={saving} className="bg-[#39795F] text-white px-6 py-2.5 rounded font-medium text-sm transition-colors hover:bg-[#00693E]">
              {saving ? 'Saving...' : categoryForm.id ? 'Update Category' : 'Add Category'}
            </button>
            <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded font-medium text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSubcategoryModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#39795F]/40 p-4 overscroll-contain">
      <div className="bg-gray-50 rounded shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain relative flex flex-col">
        <div className="bg-white p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#39795F]">{subcategoryForm.id ? 'Edit' : 'Add'} Sub Category</h2>
          <button type="button" onClick={() => setIsSubcategoryModalOpen(false)} className="text-gray-400 hover:text-gray-800 text-sm font-medium">
            Close
          </button>
        </div>
        
        <form onSubmit={createSubcategory} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">1. Basic Information</h3>
                <label className="block text-xs text-gray-500 mb-1">Parent Category <span className="text-red-500">*</span></label>
                <select value={subcategoryCategoryId} onChange={(e) => setSubcategoryCategoryId(e.target.value)} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm text-[#1F2937] focus:outline-none focus:border-[#39795F] mb-4" required>
                  <option value="" className="text-gray-500">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category.dbId} value={category.dbId} className="text-[#1F2937]">
                      {category.name}
                    </option>
                  ))}
                </select>

                <label className="block text-xs text-gray-500 mb-1">Name <span className="text-red-500">*</span></label>
                <input placeholder="Name" value={subcategoryForm.name} onChange={(e) => setSubcategoryForm(prev => ({...prev, name: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F]" required />
              </div>
              
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">2. Description</h3>
                <textarea placeholder="Description" value={subcategoryForm.description} onChange={(e) => setSubcategoryForm(prev => ({...prev, description: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F] min-h-[120px] resize-y" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">3. Sub Category Image</h3>
                <label className="block text-xs text-gray-500 mb-1">Image Upload</label>
                <label className="w-full border border-dashed border-gray-300 rounded p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-center bg-white min-h-[140px]">
                  <span className="text-sm text-[#39795F] mb-1">Drag and drop an image here</span>
                  <span className="text-xs text-gray-500">or click to browse</span>
                  <input type="file" accept="image/*" onChange={(e) => setSubcategoryForm(prev => ({...prev, image: e.target.files?.[0] || null}))} className="hidden" />
                </label>
                <div className="flex gap-2 mt-4">
                  {subcategoryForm.image && <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-200 truncate max-w-full">{subcategoryForm.image.name}</span>}
                  {subcategoryForm.existingImageUrl && !subcategoryForm.image && <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200 truncate max-w-full">Existing image attached</span>}
                </div>
              </div>

              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">4. Sort Order</h3>
                <input type="number" placeholder="0" value={subcategoryForm.sortOrder} onChange={(e) => setSubcategoryForm(prev => ({...prev, sortOrder: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F]" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button disabled={saving} className="bg-[#39795F] text-white px-6 py-2.5 rounded font-medium text-sm transition-colors hover:bg-[#00693E]">
              {saving ? 'Saving...' : subcategoryForm.id ? 'Update Sub Category' : 'Add Sub Category'}
            </button>
            <button type="button" onClick={() => setIsSubcategoryModalOpen(false)} className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded font-medium text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderProductModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#39795F]/40 p-4 overscroll-contain">
      <div className="bg-gray-50 rounded shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto overscroll-contain relative flex flex-col">
        <div className="bg-white p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#39795F]">{productForm.id ? 'Edit' : 'Add'} Product</h2>
          <button type="button" onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-gray-800 text-sm font-medium">
            Close
          </button>
        </div>
        
        <form onSubmit={createProduct} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">1. Basic Information</h3>
                <label className="block text-xs text-gray-500 mb-1">Parent Subcategory <span className="text-red-500">*</span></label>
                <select value={productSubcategoryId} onChange={(e) => setProductSubcategoryId(e.target.value)} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm text-[#1F2937] focus:outline-none focus:border-[#39795F] mb-4" required>
                  <option value="" className="text-gray-500">Choose a subcategory</option>
                  {allSubcategories.map((sub) => (
                    <option key={sub.id} value={sub.id} className="text-[#1F2937]">
                      {sub.label}
                    </option>
                  ))}
                </select>

                <label className="block text-xs text-gray-500 mb-1">Product Name <span className="text-red-500">*</span></label>
                <input placeholder="Name" value={productForm.name} onChange={(e) => setProductForm(prev => ({...prev, name: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F]" required />
              </div>
              
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">2. Description</h3>
                <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm(prev => ({...prev, description: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F] min-h-[120px] resize-y" />
              </div>

              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">3. Sort Order</h3>
                <input type="number" placeholder="0" value={productForm.sortOrder} onChange={(e) => setProductForm(prev => ({...prev, sortOrder: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F]" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">4. Product Image</h3>
                <label className="block text-xs text-gray-500 mb-1">Main Image Upload</label>
                <label className="w-full border border-dashed border-gray-300 rounded p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-center bg-white min-h-[140px]">
                  <span className="text-sm text-[#39795F] mb-1">Drag and drop an image here</span>
                  <span className="text-xs text-gray-500">or click to browse</span>
                  <input type="file" accept="image/*" onChange={(e) => setProductForm(prev => ({...prev, image: e.target.files?.[0] || null}))} className="hidden" />
                </label>
                <div className="flex gap-2 mt-4">
                  {productForm.image && <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-200 truncate max-w-full">{productForm.image.name}</span>}
                  {productForm.existingImageUrl && !productForm.image && <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200 truncate max-w-full">Existing main image attached</span>}
                </div>
              </div>

              <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-[#39795F] mb-4 text-sm">5. Product Colors</h3>
                <p className="text-xs text-gray-500 mb-4">Add color variants and their corresponding swatch images.</p>
                <div className="space-y-3">
                  {productColors.map((color, index) => (
                    <div key={index} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <input
                        placeholder="Color name"
                        value={color.name}
                        onChange={(e) => setProductColors((prev) => prev.map((item, i) => i === index ? { ...item, name: e.target.value } : item))}
                        className="flex-1 bg-gray-50 border border-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#39795F] min-w-[120px]"
                      />
                      <label className="flex items-center justify-center border border-gray-200 px-3 py-2 rounded hover:bg-gray-50 cursor-pointer text-gray-500 bg-white transition-colors">
                        <UploadCloud className="w-4 h-4 mr-2" />
                        <span className="text-xs font-medium">Image</span>
                        <input type="file" accept="image/*" onChange={(e) => setProductColors((prev) => prev.map((item, i) => i === index ? { ...item, file: e.target.files?.[0] || null } : item))} className="hidden" />
                      </label>
                      {color.file && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" title={color.file.name}></span>}
                      <button type="button" onClick={() => {
                        if (productColors.length > 1) {
                          setProductColors(prev => prev.filter((_, i) => i !== index));
                        }
                      }} className="p-2 border border-red-200 text-red-500 rounded hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setProductColors((prev) => [...prev, { name: '', file: null, sortOrder: prev.length }])} className="w-full py-2 border border-dashed border-blue-200 text-blue-600 rounded font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors mt-4">
                    <Plus className="w-4 h-4" /> Add another color
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button disabled={saving} className="bg-[#39795F] text-white px-6 py-2.5 rounded font-medium text-sm transition-colors hover:bg-[#00693E]">
              {saving ? 'Saving...' : productForm.id ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={() => setIsProductModalOpen(false)} className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded font-medium text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCard = (item: any, type: 'category' | 'subcategory' | 'product') => (
    <div key={item.dbId} className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
      <div className="h-40 bg-gray-100 w-full relative border-b border-gray-100">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#39795F] text-lg leading-tight mb-1">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-4">Sort: {item.sortOrder}</p>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem] mb-6">{item.description || 'No description'}</p>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (type === 'category') handleEditCategory(item);
              if (type === 'subcategory') handleEditSubcategory(item);
              if (type === 'product') handleEditProduct(item);
            }} 
            className="px-4 py-1.5 text-sm font-medium border border-[#39795F] text-[#39795F] rounded hover:bg-[#39795F] hover:text-white transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => {
              if (type === 'category') deleteCategory(item.dbId);
              if (type === 'subcategory') deleteSubcategory(item.dbId);
              if (type === 'product') deleteProduct(item.dbId);
            }} 
            className="px-4 py-1.5 text-sm font-medium border border-[#E1306C] text-[#E1306C] rounded hover:bg-[#E1306C] hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderList = (items: any[], type: 'category' | 'subcategory' | 'product') => (
    <div className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-[#39795F] uppercase text-xs border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-bold">Image</th>
            <th className="px-6 py-4 font-bold">Name</th>
            <th className="px-6 py-4 font-bold">Description</th>
            <th className="px-6 py-4 font-bold">Order</th>
            <th className="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.length === 0 ? (
            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No records found.</td></tr>
          ) : items.map((item) => (
            <tr key={item.dbId} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3">
                {item.image ? <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-200"><Image src={item.image} alt={item.name} fill className="object-cover" /></div> : <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400 text-xs">None</div>}
              </td>
              <td className="px-6 py-3 font-medium text-[#39795F]">{item.name}</td>
              <td className="px-6 py-3 text-gray-500 max-w-[200px] truncate">{item.description || '-'}</td>
              <td className="px-6 py-3 text-gray-500">{item.sortOrder}</td>
              <td className="px-6 py-3 text-right">
                <button 
                  onClick={() => {
                    if (type === 'category') handleEditCategory(item);
                    if (type === 'subcategory') handleEditSubcategory(item);
                    if (type === 'product') handleEditProduct(item);
                  }} 
                  className="px-3 py-1 text-sm font-medium border border-[#39795F] text-[#39795F] rounded hover:bg-[#39795F] hover:text-white transition-colors mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    if (type === 'category') deleteCategory(item.dbId);
                    if (type === 'subcategory') deleteSubcategory(item.dbId);
                    if (type === 'product') deleteProduct(item.dbId);
                  }} 
                  className="px-3 py-1 text-sm font-medium border border-[#E1306C] text-[#E1306C] rounded hover:bg-[#E1306C] hover:text-white transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#F9FAFB]"><p className="text-sm text-gray-600 font-medium">Loading...</p></div>;
  }

  return (
    <div className="flex w-full min-h-[calc(100vh-72px)] bg-[#F9FAFB]">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logout} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1600px] mx-auto">
          {error && <p className="text-sm text-red-600 mb-6 bg-red-50 p-4 rounded border border-red-100 font-medium">{error}</p>}

          {/* MAIN CATEGORIES VIEW */}
          {activeTab === 'categories' && (
            <div>
              {renderTopBar('Main Categories', 'Add Main Category', () => { setCategoryForm(emptyForm); setIsCategoryModalOpen(true); })}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filterItems(categories, 'name').map(cat => renderCard(cat, 'category'))}
                </div>
              ) : (
                renderList(filterItems(categories, 'name'), 'category')
              )}
            </div>
          )}

          {/* SUB CATEGORIES VIEW */}
          {activeTab === 'subcategories' && (
            <div>
              {renderTopBar('Sub Categories', 'Add Sub Category', () => { setSubcategoryForm(emptyForm); setSubcategoryCategoryId(''); setIsSubcategoryModalOpen(true); })}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filterItems(allSubcategories, 'name').map(sub => renderCard(sub, 'subcategory'))}
                </div>
              ) : (
                renderList(filterItems(allSubcategories, 'name'), 'subcategory')
              )}
            </div>
          )}

          {/* PRODUCTS VIEW */}
          {activeTab === 'products' && (
            <div>
              {renderTopBar('Products', 'Add Product', () => { setProductForm(emptyForm); setProductSubcategoryId(''); setProductColors([{ name: '', file: null, sortOrder: 0 }]); setIsProductModalOpen(true); })}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filterItems(allProducts, 'name').map(prod => renderCard(prod, 'product'))}
                </div>
              ) : (
                renderList(filterItems(allProducts, 'name'), 'product')
              )}
            </div>
          )}

          {/* MODALS */}
          {isCategoryModalOpen && renderCategoryModal()}
          {isSubcategoryModalOpen && renderSubcategoryModal()}
          {isProductModalOpen && renderProductModal()}

        </div>
      </div>
    </div>
  );
}
