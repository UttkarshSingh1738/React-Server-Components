'use client';

import React from "react";
import { GlobalSideNavMenu } from "@smartcoin/global-components-typescript";
import { useState } from "react";
type Props = {};

export interface SidebarItem {
	label: string;
	subItems?: SidebarItem[];
	url?: string;
}

const GlobalSideNavComponent = (props: Props) => {
	const sidebarItems = [
		{ label: "Refund Management", url: "/#/refunds" },
		{ label: "Routing Management", url: "/#/routing" },
	];

	const [activeItems, setActiveItems] = useState<(number | null)[]>(
		Array(sidebarItems.length).fill(null)
	);

	const handleItemClick = (item: SidebarItem) => {
		const path = item.url?.replace("/#", "");
		console.log("path in global component", JSON.stringify(path));
		window.parent.postMessage(
			{ type: "iframePath-payments", value: path },
			"*"
		);
	};

	const toggleSubMenu = (index: number, depth: number) => {
		const newActiveItems = [...activeItems];
		newActiveItems[depth] = newActiveItems[depth] === index ? null : index;
		setActiveItems(newActiveItems);
	};

	return (
		<GlobalSideNavMenu
			items={sidebarItems}
			activeItems={activeItems}
			toggleSubMenu={toggleSubMenu}
			handleItemClick={handleItemClick}
			headerName="Payments"
		/>
	);
};

export default GlobalSideNavComponent;