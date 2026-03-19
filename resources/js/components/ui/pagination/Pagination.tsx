'use client';

import { Link, router, usePage } from '@inertiajs/react';
import clsx from 'clsx';

interface Props {
  totalPages: number;
  currentPage?: number;
}

const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const Pagination = ({ totalPages, currentPage = 1 }: Props) => {
  const { url: pathname } = usePage();

  if (!totalPages || totalPages <= 1) return null;

  const safePage = currentPage ?? 1;
  const allPages = generatePaginationNumbers(safePage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    if (pageNumber === '...' || pageNumber === undefined || pageNumber === null) {
      return pathname;
    }

    const num = +pageNumber;
    if (num <= 0 || num > totalPages) {
      return pathname;
    }

    const url = new URL(pathname, window.location.origin);
    url.searchParams.set('page', num.toString());
    return url.pathname + url.search;
  };

  return (
    <div className="flex text-center justify-center mt-16">
      <div className="flex flex-wrap justify-center gap-2">
        <Link
          className="rounded-lg py-2 px-3 text-center text-sm transition-all shadow-sm text-white bg-cb-default hover:bg-cr-default"
          href={createPageUrl(safePage - 1)}
        >
          Anterior
        </Link>

        {allPages.map((page, idx) => (
          <Link
            key={`${page}-${idx}`}
            className={clsx(
              "min-w-9 rounded-lg py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-cb-default hover:bg-cr-default",
              {
                "text-black bg-cb-400 border-transparent shadow-md":
                  page === safePage,
              }
            )}
            href={createPageUrl(page)}
          >
            {page}
          </Link>
        ))}

        <Link
          className="rounded-lg py-2 px-3 text-center text-sm transition-all shadow-sm text-white bg-cb-default hover:bg-cr-default"
          href={createPageUrl(safePage + 1)}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
};
