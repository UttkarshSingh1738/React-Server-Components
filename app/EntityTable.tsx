import { GlobalTable } from "@smartcoin/global-components-typescript";
import React, { useEffect, useState } from "react";

export interface ColumnDescriptor {
	key: string;
	label: string;
	sortable?: boolean;
}

interface  EntityTableProps<T> {
	title: string;
	dataSource: () => Promise<T[]>;
	columnConfig: ColumnDescriptor[];
	onRowClick?: (rowData: T, rowIndex: number) => void;
};

const EntityTable : React.FC<EntityTableProps<any>> = ({
																												 title,
																												 dataSource,
																												 columnConfig,
																												 onRowClick
																											 }) => {
	const [data, setData] = useState<any[]>([]);
	const [paginationSearchQuery, setPaginationSearchQuery] = useState("");


	const [sortedColumn, setSortedColumn] = React.useState<string>("");
	const [sortDirection, setSortDirection] = React.useState<string>("");

	const handleSortingChange = (column: string, direction: string) => {
		setSortedColumn(column);
		setSortDirection(direction);
	};

	const [currentPage, setCurrentPage] = useState(1);
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchPage = (query: string) => {
		setPaginationSearchQuery(query);
		const pageToGo = parseInt(query, 10);
		if (!isNaN(pageToGo) && pageToGo >= 1 && pageToGo <= 10) {
			handlePageChange(pageToGo);
		}
	};

	const [tableSearchQuery, setTableSearchQuery] = useState("");
	const handleTableSearch = (query: string) => {
		setTableSearchQuery(query);
	};

	useEffect(() => {
		dataSource().then(data => setData(data));
	}, []);


	const customSortFunction = (
		data: any[],
		column: string,
		direction: string
	) => {
		if (direction === 'none') {
			return data;
		}
		return data.sort((a, b) => {
			const aValue = a[column];
			const bValue = b[column];

			if (direction === "asc") {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
			}
		});
	};

	return (
		<>
			<GlobalTable
				data={data}
				columns={columnConfig}
				searchQuery={tableSearchQuery}
				onSearch={handleTableSearch}
				currentPage={currentPage}
				itemsPerPage={8}
				onPageChange={handlePageChange}
				onSearchPage={handleSearchPage}
				paginationSearchQuery={paginationSearchQuery}
				title={title}
				sortedColumn={sortedColumn}
				sortDirection={sortDirection}
				onSortChange={handleSortingChange}
				sortFunction={customSortFunction}
				onRowClick={onRowClick}
			/>
		</>
	);
};

export default EntityTable;
