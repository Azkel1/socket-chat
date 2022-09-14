import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/utils/db';

export const load: LayoutServerLoad = async () => {
	const channels = await prisma.channel.findMany();

	return {
		channels
	};
};
