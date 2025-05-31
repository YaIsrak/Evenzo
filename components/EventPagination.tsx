'use client';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	paginationItemsToDisplay?: number;
};

export default function EventPagination({
	currentPage,
	totalPages,
	paginationItemsToDisplay = 5,
}: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage,
		totalPages,
		paginationItemsToDisplay,
	});

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	};

	const currentPageFromUrl = Number(searchParams.get('page')) || 1;

	return (
		<Pagination>
			<PaginationContent>
				{/* Previous page button */}
				<PaginationItem>
					<PaginationPrevious
						className='aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer'
						onClick={() =>
							currentPageFromUrl > 1 &&
							handlePageChange(currentPageFromUrl - 1)
						}
						aria-disabled={currentPageFromUrl === 1 ? true : undefined}
						role={currentPageFromUrl === 1 ? 'link' : undefined}
					/>
				</PaginationItem>

				{/* Left ellipsis (...) */}
				{showLeftEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Page number links */}
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							onClick={() => handlePageChange(page)}
							isActive={page === currentPageFromUrl}
							className='cursor-pointer'>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Right ellipsis (...) */}
				{showRightEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Next page button */}
				<PaginationItem>
					<PaginationNext
						className='aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer'
						onClick={() =>
							currentPageFromUrl < totalPages &&
							handlePageChange(currentPageFromUrl + 1)
						}
						aria-disabled={
							currentPageFromUrl === totalPages ? true : undefined
						}
						role={currentPageFromUrl === totalPages ? 'link' : undefined}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
