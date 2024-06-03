import prismaClient from "../../prisma";

class FinalizeOrderService {
    async execute(orderId: string) {
        const order = await prismaClient.pedido.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error('Pedido não encontrado');
        }

        if (!order.rascunho) {
            throw new Error('O pedido já está finalizado');
        }

        const updatedOrder = await prismaClient.pedido.update({
            where: { id: orderId },
            data: { rascunho: false, atualizado_em: new Date() },
        });

        return {
            message: 'Pedido finalizado com sucesso',
            order: updatedOrder
        };
    }
}

export { FinalizeOrderService };
