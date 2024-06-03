import prismaClient from "../../prisma";

class ListFinishedOrdersService {
    async execute() {
        const finishedOrders = await prismaClient.pedido.findMany({
            where: { rascunho: false },
            orderBy: { atualizado_em: 'desc' },
            include: { items: true },
        });

        return finishedOrders.map(order => ({
            ...order,
            criado_em: order.criado_em ? this.formatDate(order.criado_em) : null,
            atualizado_em: order.atualizado_em ? this.formatDate(order.atualizado_em) : null,
        }));
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}

export { ListFinishedOrdersService };
