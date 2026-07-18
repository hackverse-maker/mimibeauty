'use client'

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-md">
      <div className="h-64 skeleton" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-20 skeleton rounded" />
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="h-4 w-1/2 skeleton rounded" />
        <div className="h-10 w-full skeleton rounded-lg" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
