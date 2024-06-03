import prismaClient from "../../prisma";

class ListUnfinishedOrdersService {
    async execute() {
        const unfinishedOrders = await prismaClient.pedido.findMany({
            where: { status: false, rascunho: true },
            orderBy: { criado_em: 'desc' },
            include: { items: true },
        });

        return unfinishedOrders.map(order => ({
            ...order,
            criado_em: order.criado_em ? this.formatDate(order.criado_em) : null,
            atualizado_em: order.atualizado_em ? this.formatDate(order.atualizado_em) : null,
        }));
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}

export { ListUnfinishedOrdersService };
