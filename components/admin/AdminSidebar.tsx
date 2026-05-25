'use client';

import { 
  Layers, 
  Grid, 
  Box, 
  LogOut,
  Download,
  Book,
  Users,
  Ticket,
  UserPlus
} from 'lucide-react';

type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
};

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
  // Common active style: dark green background, white text
  // Common inactive style: transparent background, dark green text
  const getTabClass = (tabId: string) => {
    const isActive = activeTab === tabId;
    return `w-full flex items-center gap-4 px-4 py-3.5 text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-[#39795F] text-white' 
        : 'text-[#39795F] hover:bg-[#39795F]/5'
    }`;
  };

  return (
    <aside className="w-64 bg-white border-r border-stone-200 h-[calc(100vh-72px)] sticky top-[72px] flex flex-col pt-6 font-sans">
      <nav className="flex-1 flex flex-col overflow-y-auto">
        <button 
          onClick={() => setActiveTab('categories')}
          className={getTabClass('categories')}
        >
          <Layers className="w-5 h-5" />
          <span>Main Categories</span>
        </button>

        <button 
          onClick={() => setActiveTab('subcategories')}
          className={getTabClass('subcategories')}
        >
          <Grid className="w-5 h-5" />
          <span>Sub Categories</span>
        </button>

        <button 
          onClick={() => setActiveTab('products')}
          className={getTabClass('products')}
        >
          <Box className="w-5 h-5" />
          <span>Products</span>
        </button>

      </nav>

      <div className="p-4 border-t border-stone-200 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-md text-[#39795F] hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
