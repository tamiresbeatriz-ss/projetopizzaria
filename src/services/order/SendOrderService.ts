import prismaClient from "../../prisma";

interface OrderRequest {
    orderId: string;
}

class SendOrderService {
    async execute({ orderId }: OrderRequest) {
        const order = await prismaClient.pedido.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error('Pedido não encontrado');
        }

        if (!order.rascunho) {
            throw new Error('O pedido já foi enviado');
        }

        const updatedOrder = await prismaClient.pedido.update({
            where: { id: orderId },
            data: { rascunho: false },
        });

        return updatedOrder;
    }
}

export { SendOrderService };
