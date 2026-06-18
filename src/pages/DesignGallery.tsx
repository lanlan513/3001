import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Edit3, Plus, Eye } from 'lucide-react';
import { useDesignStore } from '@/store/useDesignStore';
import Empty from '@/components/Empty';

const DesignGallery = () => {
  const navigate = useNavigate();
  const { works, deleteWork, loadWork } = useDesignStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = (id: string) => {
    loadWork(id);
    navigate('/studio');
  };

  const handleDelete = (id: string) => {
    deleteWork(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen">
      <header className="relative py-8 md:py-12 text-center border-b border-museum-gold/20">
        <div className="container">
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 text-museum-gray hover:text-museum-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm tracking-wider uppercase">
              返回工作室
            </span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold gold-text-gradient mb-3">
            我的作品墙
          </h1>
          <p className="font-sans text-sm tracking-[0.2em] text-museum-gray uppercase mb-6">
            My Design Gallery
          </p>
          <p className="font-body text-base text-museum-gray max-w-xl mx-auto">
            展示你保存的所有高跟鞋设计作品，共 {works.length} 件作品
          </p>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex justify-end mb-8">
          <Link
            to="/studio"
            className="btn-gold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>创建设计</span>
          </Link>
        </div>

        {works.length === 0 ? (
          <Empty
            title="还没有设计作品"
            description="前往设计师工作室，创建你的第一款高跟鞋设计"
            actionText="开始设计"
            actionLink="/studio"
          />
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {works.map((work, index) => (
              <div
                key={work.id}
                className="break-inside-avoid museum-frame group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={work.previewDataUrl}
                    alt={work.name}
                    className="w-full aspect-square object-contain bg-museum-black transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEdit(work.id)}
                      className="p-3 bg-museum-gold/20 border border-museum-gold text-museum-gold hover:bg-museum-gold hover:text-museum-black transition-all"
                      title="编辑"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(work.id)}
                      className="p-3 bg-museum-burgundy/20 border border-museum-burgundy text-museum-burgundy-light hover:bg-museum-burgundy hover:text-museum-ivory transition-all"
                      title="删除"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-display text-lg text-museum-ivory mb-1 truncate">
                    {work.name}
                  </h3>
                  <p className="font-sans text-xs text-museum-gray uppercase tracking-wider">
                    {formatDate(work.createdAt)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 text-xs border border-museum-gold/30 text-museum-gold">
                      {work.config.heelHeight}cm
                    </span>
                    <span className="px-2 py-0.5 text-xs border border-museum-gold/30 text-museum-gold capitalize">
                      {work.config.material}
                    </span>
                    <span
                      className="w-4 h-4 rounded-full border border-museum-gold/30"
                      style={{ backgroundColor: work.config.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="museum-frame w-full max-w-sm mx-4 animate-fade-in">
            <h3 className="font-display text-xl text-museum-gold mb-4 text-center">
              确认删除
            </h3>
            <p className="font-body text-museum-gray text-center mb-6">
              确定要删除这件设计作品吗？此操作不可撤销。
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 border border-museum-gray/30 text-museum-gray font-sans text-sm tracking-widest uppercase transition-all hover:border-museum-gray hover:text-museum-ivory"
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-3 border border-museum-burgundy text-museum-burgundy-light font-sans text-sm tracking-widest uppercase transition-all hover:bg-museum-burgundy hover:text-museum-ivory"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-museum-gold/20 py-12 mt-12">
        <div className="container text-center">
          <p className="font-sans text-xs tracking-[0.3em] text-museum-gray uppercase mb-2">
            The High Heel Museum
          </p>
          <p className="font-body text-sm text-museum-gray-dark">
            A curated collection of iconic footwear through the decades
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DesignGallery;
